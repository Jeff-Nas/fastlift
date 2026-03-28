📑 Documentação: Visualizador de Manuais (FastLift)
Este documento detalha a implementação do componente de visualização de PDFs técnicos, focado em performance, tipagem estrita e independência de serviços externos.

🚀 Tecnologias Utilizadas
Framework: Next.js (Pages Router)

Linguagem: TypeScript (TSX)

Engine: react-pdf (baseada em PDF.js)

Ícones: lucide-react

Estilização: Tailwind CSS

🛠️ Configuração do Ambiente

1. Instalação de Dependências
   Para rodar o visualizador, as seguintes bibliotecas são necessárias:

Bash

# Instalação dos pacotes principais

npm install react-pdf pdfjs-dist lucide-react 2. Independência do Web Worker (Local)
Para evitar dependência de CDNs externas (como unpkg) e garantir o funcionamento em redes restritas, o "motor" do PDF foi movido para a pasta local.

Comando para copiar o Worker:

```Bash
cp node_modules/.pnpm/pdfjs-dist@5.4.296/node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/
Configuração no código:
```

```TypeScript
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
```

📦 O Componente: ViewerPDF.tsx
O componente foi convertido para TypeScript para garantir segurança nos dados e evitar erros de nulo/indefinido durante a navegação das páginas.

Principais Funcionalidades:
Responsividade: Uso de ResizeObserver para ajustar o PDF ao container.

Sumário Dinâmico: Extração do índice lateral (Outline) do documento.

Controles: Zoom (50% a 300%), Navegação por entrada de texto e Download direto.

Segurança: Tratamento de erros de carregamento e estados de loading customizados.

⚡ Integração com Next.js (SSR Fix)
Devido ao uso de APIs de navegador (window, canvas), o componente não pode ser renderizado no lado do servidor. A importação deve ser feita de forma dinâmica:

```TypeScript
// Exemplo de uso em uma página (pages/visualizador.tsx)
import dynamic from 'next/dynamic';

const ViewerPDF = dynamic(() => import('../components/ViewerPDF'), {
  ssr: false,
  loading: () => <div>Carregando visualizador...</div>,
});

export default function PaginaManual() {
  return <ViewerPDF pdfUrl="/documents/manual-exemplo.pdf" />;
}
```
