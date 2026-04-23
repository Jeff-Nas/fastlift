import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import manualsData from "../../../data/lista_manuais.json";
import imagesData from "../../../data/lista_imagens.json";
import { mapManualToFrontEnd, mapImageToFront } from "@/lib/manualMappers";
import { ModelCard } from "@/components/ui/modelCard";
import { ManualCard } from "@/components/ui/manualCard";
import Image from "next/image";
import { MANUFACTURERS } from "../../../constants/categories";
import { RotateCw } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import { ScrollToTopButton } from "@/components/scrollToTopButton";

export default function ManualsPage() {
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null); //selecionar primeiro elemento do array

  const router = useRouter();

  const { manufacturer, slug } = router.query;
  //caminho (path) para filtar array de manuais
  const modelPath = Array.isArray(slug) ? slug.join("/") : "";
  const fullPath = `${manufacturer}/${modelPath}`;
  //verifica se o manual existe no JSON
  const manualExist = imagesData.some((item) =>
    item.caminho_r2.toLowerCase().includes(fullPath.toLowerCase()),
  );

  //caminho para filtrar array de imagens
  const machineImages = imagesData.filter((machine) =>
    machine.caminho_r2.includes(fullPath),
  );
  const machineManuals = manualsData.filter((manual) =>
    manual.caminho_r2.includes(fullPath),
  );
  //Adaptando props para camelCase

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
  // única máquina selecionada
  const activeMachine = machineImagesAdapted.find(
    (m) => m.filtro === selectedMachine,
  );

  //verifica a mudança nas variáveis e seleciona o primeiro equipamento no array
  useEffect(() => {
    if (machineImagesAdapted.length > 0 && !selectedMachine) {
      setTimeout(() => {
        setSelectedMachine(machineImagesAdapted[0].filtro);
      }, 400);
    }
  }, [machineImagesAdapted, selectedMachine]);

  //seta o estado para conter o campo 'filtro' do array de imagens
  const handleSelectMachine = (filter: string) => {
    setSelectedMachine(filter);
  };

  if (!router.isReady) {
    return (
      <div className="bg-stone-50 h-dvh mx-auto w-full flex flex-col items-center justify-center gap-2">
        <RotateCw size={40} className="animate-spin text-orange-400" />
        <p className="font-light">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen p-2 pt-4">
      {manualExist ? (
        <div className="max-w-450 mx-auto w-full space-y-12">
          {/* Controle para card não crescer muito em tela grande - max-w-450 */}
          {/* Grid de Modelos (Superior) */}
          <div className="w-full grid grid-cols-2 gap-3 items-stretch mx-auto md:grid-cols-4 lg:grid-cols-7 lg:gap-4">
            {machineImagesAdapted.map((model) => (
              <Link href="#manuals-section" key={model.caminhoR2}>
                <ModelCard
                  item={model}
                  onClick={() => handleSelectMachine(model.filtro)}
                  active={selectedMachine === model.filtro}
                />
              </Link>
            ))}
          </div>
          {/* Seção de Manuais (Inferior) */}
          <section id="manuals-section" className="mt-8">
            {/*TÍTULO: nome do equipamento escolhido */}
            <motion.h3
              key={activeMachine?.nome}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-[20px] md:text-[25px] text-gray-700 font-header font-bold uppercase tracking-wider text-center mb-6"
            >
              {activeMachine?.nome || "Selecione uma máquina"}
            </motion.h3>

            {/* Grid de Cards dos manuais*/}
            <div className="grid grid-cols-1 gap-3 px-2 lg:grid-cols-3 w-full">
              {selectedManuals?.map((m) => (
                <ManualCard
                  key={m.caminhoR2}
                  machine={activeMachine?.nome}
                  description={m.nomeArquivo}
                  pdfUrl={m.urlPublica}
                  manualType={m.categoria}
                />
              ))}
            </div>
            {/*Botão para voltar ao topo */}
            <ScrollToTopButton />
          </section>
        </div>
      ) : (
        <div className="max-w-md mx-auto flex flex-col justify-center items-center">
          <h2 className="text-2xl md:text-3xl my-4">
            Nenhum manual encontrado
          </h2>
          <p className="text-sm md:text-base text-gray-500 my-2 lg:my-6 text-center max-w-md">
            Não encontrou o que procurava? Acesse o site do fabricante para mais
            informações.
          </p>
          <a
            href={manufacturerData?.site || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit inline-block p-2 bg-orange-500 rounded-sm text-white md:text-xl md:my-8 hover:bg-orange-500 transition-colors text-center"
          >
            Acesse
          </a>
          <Image
            src="/images/icon/no-data.svg"
            alt="no data"
            width={300}
            height={300}
            loading="eager"
            className="w-68 h-auto md:w-90 mt-8 grayscale-75"
          />
        </div>
      )}
    </div>
  );
}
