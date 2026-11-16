# ALMX Academy | Energia & Logística

Trilha independente para estudo da rotina de auxiliar de logística e almoxarifado no setor elétrico. O conteúdo usa exemplos fictícios e referências públicas. Grupo Setup, Equatorial, SAP e TOTVS são referências de contexto ou de estudo.

## Executar localmente

Sirva a pasta `public` com um servidor estático. Por exemplo, na raiz do projeto, execute `python -m http.server 8000 --directory public` e abra `http://localhost:8000`.

## Publicar no Netlify

Importe este repositório no Netlify e selecione a branch `main`. O arquivo `netlify.toml` define `public` como diretório de publicação. O site usa HTML, CSS e JavaScript sem etapa de compilação.

## Atualizar a trilha

Edite `public/lessons.js` para alterar aulas, questões ou casos fictícios. Preserve os IDs das aulas existentes para manter o progresso. As conclusões e anotações ficam no armazenamento local do navegador, por endereço do site. Limpar os dados do site remove os registros daquele navegador.
