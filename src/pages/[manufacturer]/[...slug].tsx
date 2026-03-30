import { useRouter } from "next/router";
import { useState } from "react";
import manualsData from "../../../data/lista_manuais.json";
import imagesData from "../../../data/lista_imagens.json";
import { mapManualToFrontEnd, mapImageToFront } from "@/lib/manualMappers";
import { ModelCard } from "@/components/ui/modelCard";

export default function ManualsPage() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null); //selecionar primeiro elemento do array

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

  const handleSelectModel = (filter: string) => {
    console.log(selectedModel);
    setSelectedModel(filter);
  };

  return (
    <div className="bg-slate-50 h-dvh">
      <h1>{router.asPath}</h1>
      <div className="w-full grid grid-cols-2 gap-3 mx-auto md:grid-cols-4 lg:grid-cols-7 lg:gap-1 lg:mx-8">
        {imageModelAdapted.map((model) => (
          <ModelCard
            item={model}
            key={model.caminhoR2}
            onClick={() => handleSelectModel(model.filtro)}
            active={selectedModel === model.filtro}
          />
        ))}
      </div>
    </div>
  );
}
