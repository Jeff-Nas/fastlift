import dynamic from "next/dynamic";
import { useState } from "react";
import Head from "next/head";

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
  const [pdfUrl, setPdfUrl] = useState<string>("/documents/banner-viwer.pdf");
  return (
    <div>
      <Head>
        <title>FastLift</title>
      </Head>
      <h1 className="text-2xl font-bold">Visualizador</h1>
      <ViewerPDF pdfUrl={pdfUrl} />
    </div>
  );
}
