import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import manualsData from "../../../data/lista_manuais.json";
import imagesData from "../../../data/lista_imagens.json";
import { mapManualToFrontEnd, mapImageToFront } from "@/lib/manualMappers";
import { ModelCard } from "@/components/ui/modelCard";
import Image from "next/image";
import { MANUFACTURERS } from "../../../constants/categories";
import { RotateCw } from "lucide-react";
export default function ManualsPage() {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null); //selecionar primeiro elemento do array

  const router = useRouter();

  if (!router.isReady) {
    return (
      <div className="bg-slate-50 h-dvh mx-auto w-full flex flex-col items-center justify-center gap-2">
        <RotateCw size={40} className="animate-spin text-orange-400" />
        <p className="font-light">Carregando...</p>
      </div>
    );
  }

  const { manufacturer, slug } = router.query;
  //path to filter manual array
  const modelPath = Array.isArray(slug) ? slug.join("/") : "";
  const fullPath = `${manufacturer}/${modelPath}`;
  const manualExist = imagesData.some((item) =>
    item.caminho_r2.toLowerCase().includes(fullPath.toLowerCase()),
  );

  //path to filter image array
  const machineImages = imagesData.filter((machine) =>
    machine.caminho_r2.includes(fullPath),
  );
  const machineManuals = manualsData.filter((manual) =>
    manual.caminho_r2.includes(fullPath),
  );
  //Adapting props for camelCase

  const machineManualsAdapted = machineManuals.map((model) =>
    mapManualToFrontEnd(model),
  );

  const machineImagesAdapted = machineImages.map((model) =>
    mapImageToFront(model),
  );

  const selectedManuals = machineManualsAdapted.filter((manual) =>
    manual.caminhoR2.toLowerCase().includes(selectedMachine),
  );

  const manufacturerData = MANUFACTURERS.find(
    (brand) => brand.label === manufacturer,
  );

  useEffect(() => {
    if (machineImagesAdapted.length > 0 && !selectedMachine) {
      setSelectedMachine(machineImagesAdapted[0].filtro);
    }
  }, [machineImagesAdapted, selectedMachine]);

  const handleSelectMachine = (filter: string) => {
    setSelectedMachine(filter);
    console.log(`This is the filter: ${filter}`);
    console.log(selectedManuals);
  };

  return (
    <div className="bg-slate-50 h-dvh p-2">
      {manualExist ? (
        <div className="w-full grid grid-cols-2 gap-3 mx-auto md:grid-cols-4 lg:grid-cols-7 lg:gap-1 lg:mx-8">
          {machineImagesAdapted.map((model) => (
            <ModelCard
              item={model}
              key={model.caminhoR2}
              onClick={() => handleSelectMachine(model.filtro)}
              active={selectedMachine === model.filtro}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl my-4">Nenhum manual encontrado</h2>
          <p className="text-sm text-gray-500 my-2 text-center max-w-md">
            Não encontrou o que procurava? Acesse o site do fabricante para mais
            informações.
          </p>
          <a
            href={manufacturerData?.site || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block p-2 bg-orange-500 rounded-sm text-white hover:bg-orange-500 transition-colors text-center"
          >
            Acesse
          </a>
          <Image
            src="/images/icon/no-data.svg"
            alt="no data"
            width={300}
            height={300}
            loading="eager"
            className="w-68 h-auto md:w-120 mt-8 grayscale-75"
          />
        </div>
      )}
    </div>
  );
}
