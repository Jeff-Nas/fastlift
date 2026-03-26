import { useRouter } from "next/router";
import manualData from "../../../data/manualsList.json";
import { mapManualToFrontEnd, mapImageToFront } from "@/lib/manualMappers";

export default function ManualsPage() {
  const router = useRouter();
  const { manufacturer, slug } = router.query;
  //path to filter array
  const modelPath = Array.isArray(slug) ? slug.join("/") : "";
  const fullPath = `${manufacturer}/${modelPath}`;
  const modelSelected = manualData.filter((manual) =>
    manual.caminho_r2.includes(fullPath),
  );

  //Adapting props for camelCase

  const manualModelAdapted = modelSelected.map((model) =>
    mapManualToFrontEnd(model),
  );

  console.log(manualModelAdapted);

  return (
    <div>
      <h1>{router.asPath}</h1>
    </div>
  );
}
