Este projeto usa JavaScript inicialmente, pois comecei aprendendo Next sem uma base sólida de Typescript. Portanto, optei por usar Javascript e converter para Typescript posteriormente.

## 🏗️ Arquitetura de Roteamento e Filtragem (Catálogo de Manuais)

Para garantir alta performance e escalabilidade, o sistema de roteamento do FastLift foi projetado para espelhar a estrutura de diretórios do storage (Cloudflare R2).

Em vez de utilizar buscas complexas por palavras-chave ou criar dezenas de páginas estáticas, a aplicação utiliza **Next.js Catch-All Routes** (`[...slug].js`) em conjunto com a filtragem direta de um banco de dados estático (`lista_manuais.json`).

### 🔄 Fluxo de Funcionamento:

1. **A Fonte da Verdade (R2 Storage):** Os manuais estão organizados fisicamente em pastas no storage seguindo o padrão: `fabricante/motorizacao/categoria/` (ex: `JLG/diesel/boom-lift/`).
2. **O JSON Base:** Um script externo (`rclone` + `jq`) gera um arquivo JSON contendo os metadados dos arquivos, incluindo a chave `caminho_r2` que preserva a estrutura de pastas.
3. **Roteamento Dinâmico (Next.js):** - A rota base captura o fabricante: `pages/[manufacturer]/` (ex: `jlg`).
   - A rota Catch-All captura o restante da URL como um array: `[...slug].js` (ex: `['diesel', 'boom-lift']`).
4. **O Motor de Filtragem:** O front-end reconstrói o caminho unindo o fabricante e o array do slug com barras (`/`), gerando a string exata do caminho (ex: `jlg/diesel/boom-lift`). Em seguida, filtra o JSON retornando apenas os objetos cujo `caminho_r2` contenha essa string exata.

### ✨ Vantagens desta Abordagem:

- **Zero Falsos Positivos:** Como a busca é feita pelo caminho exato do diretório, elimina-se o risco de listar manuais errados por coincidência de palavras no nome do arquivo.
- **Escalabilidade Automática:** Se uma nova subcategoria for criada no R2 (ex: `jlg/diesel/boom-lift/articulado`), o Catch-All Route processa a nova URL sem necessidade de alterar o código do front-end.
- **Performance:** A filtragem ocorre em tempo real no lado do cliente sobre um JSON estático pré-carregado, resultando em uma navegação instantânea.
