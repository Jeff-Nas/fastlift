VISUALIZAR: Ctrl + Shift + V

Este projeto usa JavaScript inicialmente, pois comecei aprendendo Next sem uma base sólida de Typescript. Portanto, optei por usar Javascript e converter para Typescript posteriormente.

# 🏗️ FastLift - Portal Técnico no segmento de máquinas PEMT

O **FastLift** é um SaaS desenvolvido para centralizar manuais técnicos de máquinas PEMT (Plataformas de Trabalho em Altura), HUB para compartilhar soluções de falhas e visando ainda muitas outras soluções para facilitar a manutenção e inspeção de equipamentos.

## 🛠️ O Projeto

Este projeto está sendo construído em **Next.js** e está em processo de migração de JavaScript para **TypeScript** para garantir maior robustez.

## ✨ Principais Funcionalidades

- **Visualizador de PDF Otimizado:** Renderização rápida com suporte a zoom, índice dinâmico e carregamento de worker local.
- **Navegação de Alta Performance:** Filtragem instantânea baseada na estrutura de pastas do Cloudflare R2.
- **Arquitetura Escalável:** Uso de Catch-all Routes para processar novas categorias de máquinas sem deploy adicional.

## 📖 Documentação Técnica

Para entender os detalhes de implementação, acesse os guias específicos:

1. [Guia de Arquitetura e Roteamento](./docs/arquitetura.md)
2. [Implementação do Visualizador de PDF](./docs/visualizador-pdf.md)

## ⚡ Como rodar localmente

1. Clone o repositório.
2. Instale as dependências: `pnpm install`
3. Execute o servidor de desenvolvimento: `pnpm dev`
