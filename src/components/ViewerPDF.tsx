import { useState, useEffect, useRef, useMemo } from "react";
import { Document, Page, pdfjs, Outline } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  BookX,
  Search,
} from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configuração do Worker
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;

interface ViewerPDFProps {
  pdfUrl: string;
}

const ViewerPDF = ({ pdfUrl }: ViewerPDFProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageInput, setPageInput] = useState<number | string>(1);
  const [hasOutline, setHasOutline] = useState<boolean>(true);
  //Estados para localização de página
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  // Guarda o arquivo para busca
  const [pdfInstance, setPdfInstance] = useState<any>(null);
  // Novo estado para controlar o loop da pesquisa
  const [lastSearchText, setLastSearchText] = useState("");

  // NOVO: Estado para controlar a porcentagem de carregamento
  const [loadProgress, setLoadProgress] = useState<number>(0);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1.0);
  //Controle de Zoom
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);
  const zoomTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    [],
  );

  // Controle de exibição do zoom
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setShowZoomIndicator(true);
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }
    zoomTimeoutRef.current = setTimeout(() => {
      setShowZoomIndicator(false);
    }, 1500);
    return () => {
      if (zoomTimeoutRef.current) clearTimeout(zoomTimeoutRef.current);
    };
  }, [scale]);

  useEffect(() => {
    setPageInput(pageNumber);
  }, [pageNumber]);

  // --- RESPONSIVIDADE ---
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        for (const entry of entries) {
          if (entry.contentRect.width) {
            const width = window.innerWidth;
            const margin = width < 1024 ? 10 : 50;
            setContainerWidth(entry.contentRect.width - margin);
          }
        }
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [sidebarOpen]);

  function onDocumentLoadSuccess(pdf: {
    numPages: number;
    getOutline: () => Promise<any[]>;
  }) {
    setNumPages(pdf.numPages);
    setPageNumber(1);
    setPdfInstance(pdf);
    pdf
      .getOutline()
      .then((outline) => {
        setHasOutline(outline && outline.length > 0);
      })
      .catch(() => {
        setHasOutline(false);
      });
  }

  // NOVO: Função que calcula o progresso de download do PDF
  function onDocumentLoadProgress({
    loaded,
    total,
  }: {
    loaded: number;
    total: number;
  }) {
    const progress = Math.round((loaded / total) * 100);
    setLoadProgress(progress);
  }

  function changePage(offset: number) {
    setPageNumber((prev) => {
      if (!numPages) return prev;
      return Math.min(Math.max(1, prev + offset), numPages);
    });
  }
  //Função de busca global no PDF
  const handleGlobalSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pdfInstance || !searchText || !numPages) return;

    setIsSearching(true);
    const query = searchText.toLowerCase().trim();
    let foundPage = null;

    // LÓGICA DE LOOP: Se for a mesma busca, começa da página seguinte.
    let startPage = pageNumber;
    if (query === lastSearchText) {
      startPage = pageNumber < numPages ? pageNumber + 1 : 1;
    }
    setLastSearchText(query); // Atualiza a última busca feita

    try {
      // 1ª Tentativa: Procura da página definida (startPage) até o final do PDF
      for (let i = startPage; i <= numPages; i++) {
        const page = await pdfInstance.getPage(i);
        const textContent = await page.getTextContent();
        const textStr = textContent.items
          .map((item: any) => item.str)
          .join(" ")
          .toLowerCase();

        if (textStr.includes(query)) {
          foundPage = i;
          break;
        }
      }

      // 2ª Tentativa: Se não achou até o final, dá a volta e procura da pág 1 até antes da startPage
      if (!foundPage) {
        for (let i = 1; i < startPage; i++) {
          const page = await pdfInstance.getPage(i);
          const textContent = await page.getTextContent();
          const textStr = textContent.items
            .map((item: any) => item.str)
            .join(" ")
            .toLowerCase();

          if (textStr.includes(query)) {
            foundPage = i;
            break;
          }
        }
      }

      if (foundPage) {
        setPageNumber(foundPage);
      } else {
        alert("Peça ou texto não encontrado neste manual.");
      }
    } catch (error) {
      console.error("Erro ao pesquisar no PDF:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Função que pinta o texto encontrado na página
  const highlightPattern = (text: string, pattern: string) => {
    if (!pattern) return text;
    const regex = new RegExp(`(${pattern})`, "gi");
    return text.replace(
      regex,
      (match) =>
        `<mark class="bg-yellow-400 text-black font-bold p-0.5 rounded shadow-sm">${match}</mark>`,
    );
  };

  const textRenderer = (textItem: any) => {
    return highlightPattern(textItem.str, searchText);
  };

  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let page = typeof pageInput === "string" ? parseInt(pageInput) : pageInput;

    if (!isNaN(page) && numPages && page >= 1 && page <= numPages) {
      setPageNumber(page);
    } else {
      setPageInput(pageNumber);
    }
  };

  function onItemClick({ pageNumber }: { pageNumber: string | number }) {
    const pageNum =
      typeof pageNumber === "string" ? parseInt(pageNumber) : pageNumber;
    setPageNumber(pageNum);
    if (window.innerWidth < 768) setSidebarOpen(false);
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop() || "manual-tecnico.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-dvh w-full bg-gray-100 font-sans overflow-hidden text-gray-800">
      <aside
        className={`bg-white border-r border-gray-200 h-full flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? "w-80 translate-x-0"
            : "w-0 -translate-x-full overflow-hidden"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-700">Índice</h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {hasOutline ? (
            <div className="[&_ul]:list-none [&_ul]:pl-2 [&_li]:mt-2 [&_a]:text-sm [&_a]:text-gray-600 [&_a]:no-underline [&_a]:block [&_a]:cursor-pointer [&_a]:transition-colors hover:[&_a]:text-blue-600 hover:[&_a]:font-medium">
              <Document
                file={pdfUrl}
                loading={
                  <div className="text-sm text-gray-500 animate-pulse">
                    Carregando índice...
                  </div>
                }
                options={options}
              >
                {/* @ts-ignore */}
                <Outline onItemClick={onItemClick} />
              </Document>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400 text-center p-4">
              <BookX size={48} className="mb-2 opacity-50" />
              <p className="text-sm">
                Este documento não possui um índice interativo.
              </p>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300">
        {/* CABEÇALHO RESPONSIVO */}
        <div className="min-h-16 py-2 bg-white border-b border-gray-200 flex justify-between items-center px-2 md:px-6 shadow-sm z-10 shrink-0 gap-1 md:gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* 1. ESQUERDA: Menu e Download */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 md:p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all border border-transparent hover:border-gray-200"
              >
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}

            <button
              onClick={handleDownload}
              className="p-1.5 md:px-3 md:py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors flex items-center justify-center border border-blue-100"
              title="Baixar Manual"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden md:inline ml-2 text-sm font-medium">
                Baixar
              </span>
            </button>
          </div>

          {/* 2. DIREITA: Busca e Página (Sem as lupas antigas) */}
          <div className="flex items-center gap-1.5 md:gap-4 shrink-0 ml-auto">
            {/* FORMULÁRIO DE BUSCA */}
            <form
              onSubmit={handleGlobalSearch}
              className="flex items-center gap-1 md:gap-2"
            >
              <input
                type="text"
                placeholder="Peça..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-20 sm:w-28 md:w-48 px-2 md:px-3 py-1.5 text-xs md:text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium bg-gray-50 text-gray-800 placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="p-1.5 md:px-3 md:py-1.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 border border-gray-200 flex items-center justify-center transition-colors shadow-sm"
                title="Buscar"
              >
                {isSearching ? (
                  <RotateCw className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4 md:w-5 md:h-5 md:hidden" />
                    <span className="hidden md:inline text-sm">Buscar</span>
                  </>
                )}
              </button>
            </form>

            {/* FORMULÁRIO DE PÁGINA */}
            <form
              onSubmit={handlePageSubmit}
              className="flex items-center bg-white border-2 border-gray-200 rounded-lg px-1.5 md:px-2 py-1 shadow-sm hover:border-gray-300 transition-colors"
            >
              <span className="text-xs md:text-sm font-semibold text-gray-500 mr-1 md:mr-2 hidden lg:inline">
                Pág.
              </span>
              <input
                type="number"
                min={1}
                max={numPages || 1}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={handlePageSubmit}
                className="w-8 sm:w-10 md:w-12 text-center text-xs md:text-base font-bold text-gray-800 bg-gray-100 hover:bg-gray-200 focus:bg-orange-100 focus:text-orange-700 rounded outline-none py-0.5 md:py-1 appearance-none m-0 cursor-text"
              />
              <span className="text-xs md:text-sm font-bold text-gray-300 mx-1 select-none">
                /
              </span>
              <span className="text-xs md:text-sm font-bold text-gray-600 select-none mr-1">
                {numPages || "--"}
              </span>
              <button type="submit" hidden />
            </form>
          </div>
        </div>

        {/* Indiador do Zoom */}
        <div
          className={`absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-black/70 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg transition-opacity duration-300 pointer-events-none flex items-center gap-2 ${
            showZoomIndicator ? "opacity-100" : "opacity-0"
          }`}
        >
          <Search size={16} className="text-gray-300" />
          {Math.round(scale * 100)}%
        </div>

        {/* NOVOS BOTÕES FLUTUANTES NO RODAPÉ COM ZOOM */}
        <div className="absolute bottom-16 md:bottom-12 left-0 right-0 w-full px-2 sm:px-4 lg:px-12 flex justify-between items-center z-40 pointer-events-none">
          {/* GRUPO ESQUERDA: Voltar Página e Menos Zoom */}
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-none">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 bg-orange-600 opacity-80 text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.4)] disabled:opacity-0 transition-all active:scale-95 border-2 border-white/20 hover:bg-orange-700"
              aria-label="Página anterior"
            >
              <ChevronLeft size={36} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
              className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 bg-gray-100 opacity-80 text-gray-700 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all active:scale-95 border-2 border-white/50 hover:bg-gray-200"
              aria-label="Menos zoom"
            >
              <ZoomOut size={24} strokeWidth={2.5} />
            </button>
          </div>

          {/* CENTRO: Indicador de Página (Mobile) */}
          <div className="pointer-events-auto md:hidden bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-md mx-1">
            {pageNumber} / {numPages || "--"}
          </div>

          {/* GRUPO DIREITA: Mais Zoom e Avançar Página */}
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-none">
            <button
              onClick={() => setScale((s) => Math.min(3.0, s + 0.25))}
              className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 bg-gray-100 opacity-80 text-gray-700 rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all active:scale-95 border-2 border-white/50 hover:bg-gray-200"
              aria-label="Mais zoom"
            >
              <ZoomIn size={24} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => changePage(1)}
              disabled={numPages ? pageNumber >= numPages : true}
              className="pointer-events-auto w-14 h-14 md:w-16 md:h-16 bg-orange-600 opacity-80 text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.4)] disabled:opacity-0 transition-all active:scale-95 border-2 border-white/20 hover:bg-orange-700"
              aria-label="Próxima página"
            >
              <ChevronRight size={36} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/*Container do PDF */}
        <div
          ref={containerRef}
          className="flex-1 bg-slate-700 overflow-auto p-2 lg:p-8 relative"
        >
          {/* MUDANÇA AQUI: de "w-full flex justify-center" para "w-max" */}
          <div className="shadow-2xl h-fit w-max mx-auto">
            <Document
              file={pdfUrl}
              options={options}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadProgress={onDocumentLoadProgress}
              loading={
                <div className="flex flex-col items-center justify-center gap-4 text-white mt-20 w-full max-w-sm mx-auto bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-600">
                  <div className="flex items-center gap-3">
                    <RotateCw
                      className="animate-spin text-blue-400"
                      size={24}
                    />
                    <span className="font-medium">Carregando documento...</span>
                  </div>

                  <div className="w-full bg-slate-600 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-blue-400 h-2.5 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${loadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-300">
                    {loadProgress}% concluído
                  </span>
                </div>
              }
              error={
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-20">
                  Erro ao carregar PDF. Verifique se o arquivo existe e está
                  acessível.
                </div>
              }
              className="flex flex-col gap-4"
            >
              <Page
                pageNumber={pageNumber}
                width={containerWidth ? Math.min(containerWidth, 800) : 600}
                scale={scale}
                className="bg-white"
                renderTextLayer={true}
                renderAnnotationLayer={true}
                customTextRenderer={textRenderer} // Linha adicionada
                devicePixelRatio={Math.min(window.devicePixelRatio, 2)}
              />
            </Document>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewerPDF;
