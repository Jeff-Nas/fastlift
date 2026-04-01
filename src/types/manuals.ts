export interface Manual {
  nomeArquivo: string;
  caminhoR2: string;
  tamanho: number;
  dataModificacao: string;
  urlPublica: string;
  categoria: string;
}

export interface ModelImage extends Manual {
  nome: string;
  marca: string;
  filtro: string;
}
