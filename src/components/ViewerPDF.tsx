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
} from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configuração do Worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// 1. Tipagem das Props do componente
interface ViewerPDFProps {
  pdfUrl: string;
}

const ViewerPDF = ({ pdfUrl }: ViewerPDFProps) => {
  // 2. Tipagem dos States
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageInput, setPageInput] = useState<number | string>(1);
  const [hasOutline, setHasOutline] = useState<boolean>(true);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1.0);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  // 3. Tipagem da Ref
  const containerRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => ({
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
    }),
    [],
  );

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

  // 4. Tipagem do objeto PDF retornado pelo react-pdf
  function onDocumentLoadSuccess(pdf: {
    numPages: number;
    getOutline: () => Promise<any[]>;
  }) {
    setNumPages(pdf.numPages);
    setPageNumber(1);

    pdf
      .getOutline()
      .then((outline) => {
        setHasOutline(outline && outline.length > 0);
      })
      .catch(() => {
        setHasOutline(false);
      });
  }

  // 5. Tipagem do parâmetro da função
  function changePage(offset: number) {
    setPageNumber((prev) => {
      if (!numPages) return prev;
      return Math.min(Math.max(1, prev + offset), numPages);
    });
  }

  // 6. Tipagem do Evento de Form/Input
  const handlePageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let page = typeof pageInput === "string" ? parseInt(pageInput) : pageInput;

    if (!isNaN(page) && numPages && page >= 1 && page <= numPages) {
      setPageNumber(page);
    } else {
      setPageInput(pageNumber);
    }
  };

  // 7. Tipagem do retorno do clique no Outline
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
                loading="Carregando índice..."
                options={options}
              >
                {/* @ts-ignore - Ignorando erro de tipagem interno do react-pdf */}
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
        <div className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-2 md:px-6 shadow-sm z-10 shrink-0 gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded text-gray-600"
              >
                <Menu size={20} />
              </button>
            )}

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-2 md:px-3 py-1.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 cursor-pointer transition-colors text-sm font-medium border border-blue-100"
              title="Baixar Manual"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Baixar</span>
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className="p-1 md:p-1.5 hover:bg-white hover:shadow-sm rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>

            <form onSubmit={handlePageSubmit} className="flex items-center">
              <input
                type="number"
                min={1}
                max={numPages || 1}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={handlePageSubmit}
                className="w-10 md:w-12 text-center text-sm font-medium bg-transparent outline-none hover:bg-white focus:bg-white focus:ring-1 focus:ring-blue-300 rounded transition-all appearance-none m-0"
              />
              <span className="text-sm font-medium text-gray-500 select-none">
                / {numPages || "--"}
              </span>
              <button type="submit" hidden />
            </form>

            <button
              onClick={() => changePage(1)}
              disabled={numPages ? pageNumber >= numPages : true}
              className="p-1 md:p-1.5 hover:bg-white hover:shadow-sm rounded disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded text-gray-500"
            >
              <ZoomOut size={18} />
            </button>

            <span className="text-xs text-gray-500 w-8 md:w-10 text-center select-none">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={() => setScale((s) => Math.min(3.0, s + 0.25))}
              className="p-1.5 md:p-2 hover:bg-gray-100 rounded text-gray-500"
            >
              <ZoomIn size={18} />
            </button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="flex-1 bg-slate-700 overflow-auto flex items-start p-2 lg:p-8 relative"
        >
          {/*página do pdf */}
          <div className="shadow-2xl h-fit mx-auto">
            <Document
              file={pdfUrl}
              options={options}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center gap-2 text-white">
                  <RotateCw className="animate-spin text-orange-400" />{" "}
                  Carregando...
                </div>
              }
              error={
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  Erro ao carregar PDF
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
