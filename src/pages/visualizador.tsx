import dynamic from "next/dynamic";
import Head from "next/head";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/router";

const ViewerPDF = dynamic(() => import("@/components/ViewerPDF"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Preparando o manual...</p>
      </div>
    </div>
  ),
});
export default function ViewerPage() {
  // const [pdfUrl, setPdfUrl] = useState<string>("/documents/banner-viwer.pdf");
  const router = useRouter();
  const queryUrl = router.query.pdfUrl;

  // Se for array, pega o primeiro item. Se não, usa o valor ou o padrão.
  const pdfUrl: string = Array.isArray(queryUrl)
    ? queryUrl[0]
    : queryUrl || "/documents/banner-viwer.pdf";

  // Enquanto o router não está pronto, mostramos um loading ou null
  if (!router.isReady) {
    return (
      <div className="bg-stone-50 h-dvh mx-auto w-full flex flex-col items-center justify-center gap-2">
        <RotateCw size={40} className="animate-spin text-orange-400" />
        <p className="font-light">Preparando manual...</p>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>Visualizador | FastLift</title>
      </Head>
      <h1 className="text-xl text-center font-header font-semibold text-slate-600">
        Visualizador
      </h1>
      <ViewerPDF pdfUrl={pdfUrl} />
    </div>
  );
}
