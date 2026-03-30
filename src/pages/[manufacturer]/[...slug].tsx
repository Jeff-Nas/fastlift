import { useRouter } from "next/router";
import manualsData from "../../../data/lista_manuais.json";
import imagesData from "../../../data/lista_imagens.json";
import { mapManualToFrontEnd, mapImageToFront } from "@/lib/manualMappers";
import { ModelCard } from "@/components/ui/modelCard";
import Image from "next/image";

export default function ManualsPage() {
  const router = useRouter();
  // if (!router.isReady) return null; validação futura com carregamento
  const { manufacturer, slug } = router.query;
  //path to filter manual array
  const modelPath = Array.isArray(slug) ? slug.join("/") : "";
  const fullPath = `${manufacturer}/${modelPath}`;
  const modelSelected = manualsData.filter((manual) =>
    manual.caminho_r2.includes(fullPath),
  );
  //path to filter image array
  const modelIMages = imagesData.filter((model) =>
    model.caminho_r2.includes(fullPath),
  );
  //Adapting props for camelCase

  const manualModelAdapted = modelSelected.map((model) =>
    mapManualToFrontEnd(model),
  );

  const imageModelAdapted = modelIMages.map((model) => mapImageToFront(model));

  console.log(imageModelAdapted);

  return (
    <div className="bg-slate-50 h-dvh">
      <h1>{router.asPath}</h1>
      <div className="w-full grid grid-cols-2 gap-3 mx-auto md:grid-cols-4 lg:grid-cols-7 lg:gap-1 lg:mx-8">
        {imageModelAdapted.map((model) => (
          <ModelCard item={model} key={model.caminhoR2} />
        ))}
      </div>
    </div>
  );
}
