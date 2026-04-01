# Documentação: Visualizador de Manuais (FastLift)

## Visão Geral

O componente é um visualizador de manuais técnicos em PDF, focado em tipagem estrita e independência de serviços externos. Ele foi projetado para alta performance através de renderização página a página e possui responsividade nativa para oferecer uma experiência semelhante a aplicativos em celulares e tablets.

| Categoria | Tecnologia |
| :--- | :--- |
| **Framework** | Next.js (Pages Router) |
| **Linguagem** | TypeScript (TSX) |
| **Engine** | react-pdf (baseada em PDF.js) |
| **Ícones** | lucide-react |
| **Estilização** | Tailwind CSS |

---

## Funcionalidades Principais

* **Zoom Dinâmico:** Controles de zoom que variam de 50% a 300%, operando em passos incrementais de 25%.
* **Navegação Híbrida:** Suporte para transição via setas, entrada manual de texto indicando a página desejada e Sumário Dinâmico extraído do índice (Outline) original do documento.
* **Layout Mobile-First:** Otimizado para os navegadores Safari (iOS) e Chrome (Android), maximizando o aproveitamento do espaço de tela.
* **Feedback de Carregamento (Atualização v2):** O componente utiliza a função `onDocumentLoadProgress` para alimentar um novo estado (`loadProgress`) e exibir uma barra de progresso animada acompanhada de porcentagem textual.
* **Segurança e Interação:** Tratamento embutido de erros de carregamento e um botão nativo para download direto do arquivo original.

---

## Instalação e Ambiente

### 1. Dependências Iniciais
Instale os pacotes principais necessários para o funcionamento do motor de renderização e dos ícones de interface.

```bash
npm install react-pdf pdfjs-dist lucide-react
```
## 2. Configuração do Web Worker Local
Para garantir o funcionamento em redes com restrições e eliminar a dependência de CDNs externas, copie o motor de PDF diretamente para sua pasta pública.

Execute o comando no terminal:

```bash
cp node_modules/.pnpm/pdfjs-dist@5.4.296/node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/
```
Declare a fonte do worker no código da sua aplicação:

```typescript
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
```
## 3. Configuração de CORS (Obrigatório)

Ao consumir PDFs hospedados em serviços externos como AWS S3 ou Cloudflare R2, o CORS precisa estar configurado corretamente. No painel do Cloudflare (Rules > Transform Rules > Response Header Modification), adicione as regras abaixo para o Hostname do seu bucket:

Access-Control-Allow-Origin: * ou o domínio específico da sua aplicação.

Access-Control-Allow-Methods: GET, HEAD, OPTIONS

Nota: Se a renderização falhar exibindo uma tela em branco com o aviso "Network Error", limpe o cache do provedor (Purge Everything) e valide essas configurações de cabeçalho.

---

## Como Usar (Fix para Next.js SSR)

O componente interage diretamente com APIs do navegador (como canvas e window), o que impede sua renderização no lado do servidor (SSR). A importação deve ser feita dinamicamente no Next.js. O contêiner pai não exige altura fixa, pois o próprio visualizador ocupa h-[100dvh].

```typescript
import dynamic from 'next/dynamic';

const ViewerPDF = dynamic(() => import('../components/ViewerPDF'), {
  ssr: false,
  loading: () => <div>Carregando visualizador...</div>,
});

export default function PaginaManual() {
  return <ViewerPDF pdfUrl="/documents/manual-exemplo.pdf" />;
}
```
## Otimizações Técnicas para Manutenção
Comportamento de Layout e Scroll
O contêiner pai emprega as classes items-start e overflow-auto para assegurar a rolagem nos dois eixos sem cortar a parte superior do PDF durante o zoom.

A propriedade justify-center foi substituída por margens laterais (mx-auto) na página filha, pois navegadores não permitem rolagem para coordenadas negativas quando o centro corta o lado esquerdo em níveis altos de zoom.

Para evitar obstrução do conteúdo logo após o carregamento, a atualização v2 determina que o componente inicie com a Sidebar recolhida (sideBarOpen = false).

Ajustes Nativos para Dispositivos Apple
A altura é administrada utilizando h-[100dvh] em vez de h-screen, impedindo que a barra dinâmica de endereços do iPhone oculte controles na base da tela.

O devicePixelRatio do canvas está estritamente limitado a um máximo de 2 para prevenir o consumo excessivo de memória e falhas na renderização em telas Retina (x3).

O hook useMemo aciona uma CDN específica para carregar mapas de caracteres complexos e fontes padrão de forma independente, evitando erros de texto quebrado em navegadores Safari.