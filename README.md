# 🏗️ FastLift - Portal Técnico no segmento de máquinas PEMT

O **FastLift** é um SaaS desenvolvido para centralizar manuais técnicos de máquinas PEMT (Plataformas de Trabalho em Altura), HUB para compartilhar soluções de falhas e visando ainda muitas outras soluções para facilitar a manutenção e inspeção de equipamentos.

## 🛠️ O Projeto

Esse projeto surgiu ao perceber a dificuldade que os técnicos de manutenção de máuinas PEMT tinham para encontrar e visualizar manuais técnicos (vivi isso de perto).Os sites oficiais não ligam para pefomance e responsividade nesta camada. Então eu estudei métodos para implementar uma interface limpa e uma insfraestutura rápida que permitisse ao técnico usar os manuais em campo de forma muito acessível.

## ✨ Principais Funcionalidades

- **Visualizador de PDF Otimizado:** Renderização rápida com suporte a zoom, índice dinâmico e carregamento de worker local.
- **Navegação de Alta Performance:** Filtragem instantânea baseada na estrutura de pastas do Cloudflare R2.
- **Arquitetura Escalável:** Uso de Catch-all Routes para processar novas categorias de máquinas sem deploy adicional.

## Melhorias Implementadas

### Botões de mudança de página maiores

Técnica aplicada: fat little finger e teclas polegar friendly

Coletando dados dos primeiros usuários, recebi o seguinte feedback:

- os botões para troca de página eram pequenos demais para o ténico utilizar, pois muitas vezes estavam de luvas ou com as mãos sujas de graxa.Um deles posicionou o celular sobre o equipamento e testou essa troca.

### Botões de zoom de maiores

Após esta melhoria, eu mesmo percebi qu o usuário precisa dar zoom várias vezes para visualizar vistas explodidas ou números de peças e faz isso enquanto alterna entre páginas.Então implementei os botões ligeiramente próximos aos botões de troca de página, com uma opacidade de 80.

### Campo de busca

- É muito comum no dia a dia da manutenção o técnico pesquisar part numbers. Adicionei o campo de busca ao ViewerPDF.

## 📖 Documentação Técnica

Para entender os detalhes de implementação, acesse os guias específicos:

1. [Guia de Arquitetura e Roteamento](docs/arquiquetura.md)
2. [Implementação do Visualizador de PDF](docs/visualizador-pdf.md)

## ⚡ Como rodar localmente

1. Clone o repositório.
2. Instale as dependências: `pnpm install`
3. Execute o servidor de desenvolvimento: `pnpm dev`
