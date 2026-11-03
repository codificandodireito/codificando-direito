# Codificando Direito: instruções para atualizar o site

Site estático publicado no Netlify (https://codificandodireito.netlify.app) a partir da branch `main`.
A dona do site, Maiara, é iniciante em programação: tudo que for mostrado a ela deve estar em português simples.

## O que o site é

Quadro de **oportunidades gratuitas de educação**. Somente educação: cursos livres e de extensão,
idiomas, técnicos, graduações, pós-graduação, mestrado, doutorado e concursos, em universidades
públicas, institutos federais e escolas de governo.

- **Foco principal:** cursos **a distância** (EAD) que qualquer pessoa do Brasil pode fazer.
- **Foco local:** oportunidades **presenciais em Porto Velho, RO**.
- **Nunca** incluir cursos pagos, notícias, política ou qualquer assunto fora de educação.

## Regras da atualização semanal

1. Altere **somente** `oportunidades.js` e a data `<lastmod>` de `sitemap.xml`.
   Nunca altere `index.html`, imagens ou outros arquivos numa atualização de conteúdo.
2. **Remova** toda oportunidade cujo `prazo` já passou.
3. **Confira cada item que ficar** na página oficial: prazo, link funcionando e gratuidade.
   Se o prazo foi prorrogado, atualize. Se não der para confirmar, remova e explique no pull request.
4. **Adicione** oportunidades novas com inscrições abertas, conferidas na **fonte oficial**
   (site da instituição ou edital). Sites de notícia servem só para descobrir oportunidades, não como fonte final.
   Meta: entre 8 e 20 itens no quadro, com maioria a distância.
5. Preencha todos os campos no padrão do arquivo, incluindo a referência ABNT
   (`autor` em MAIÚSCULAS, `obra`, `cidade`, `editora`, `ano`). Datas no formato `AAAA-MM-DD`.
   Instituição por extenso com a sigla entre parênteses.
6. Atualize `window.ATUALIZADO` para a data de hoje.
7. Verifique a sintaxe com `node --check oportunidades.js` antes de enviar.
8. Crie uma branch `atualizacao-AAAA-MM-DD`, faça o commit e abra um **pull request** para `main`.
   **Nunca** faça merge e nunca envie direto para `main`: quem aprova é a Maiara.

## Descrição do pull request (em português simples)

- **Entraram:** lista com nome, instituição, prazo e link oficial de cada item novo.
- **Saíram:** o que foi removido e por quê (prazo encerrado, não confirmado etc.).
- **Atenção:** prazos que encerram nos próximos 7 dias, bons para post de "últimos dias".
- Uma linha final: "Para publicar, clique em **Merge pull request** e depois em **Confirm merge**."
