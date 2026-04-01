import { Manual, ModelImage } from "@/types/manuals";

const manualCategories = ["parts", "service", "operation"] as const;
//retrieves any value accessed by a numeric index from this array.
type ManualCategory = (typeof manualCategories)[number];

const findManualCategory = (path: string): ManualCategory | null => {
  return manualCategories.find((c) => path.includes(c)) || null;
};

//Adapting props for camelCase
export const mapManualToFrontEnd = (data: any): Manual => {
  return {
    nomeArquivo: data.nome_arquivo,
    caminhoR2: data.caminho_r2,
    tamanho: data.tamanho,
    dataModificacao: data.data_modificacao,
    urlPublica: data.url_publica,
    categoria: findManualCategory(data.caminho_r2),
  };
};

export const mapImageToFront = (data: any): ModelImage => {
  return {
    ...mapManualToFrontEnd(data),
    nome: data.nome,
    marca: data.marca,
    filtro: data.filtro,
  };
};
