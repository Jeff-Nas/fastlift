import { useRouter } from "next/router";
import manualData from "../../../data/lista_manuais.json";
import imagesData from "../../../data/lista_imagens.json";
import { mapManualToFrontEnd, mapImageToFront } from "@/lib/manualMappers";

export default function ManualsPage() {
  const router = useRouter();
  // if (!router.isReady) return null; validação futura com carregamento
  const { manufacturer, slug } = router.query;
  //path to filter manual array
  const modelPath = Array.isArray(slug) ? slug.join("/") : "";
  const fullPath = `${manufacturer}/${modelPath}`;
  const modelSelected = manualData.filter((manual) =>
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

  console.log(modelIMages);

  return (
    <div>
      <h1>{router.asPath}</h1>
    </div>
  );
}
