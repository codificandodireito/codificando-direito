# Ferramentas

`gerar-carrossel.js` gera as imagens dos carrosséis do Instagram (1080 × 1350, monocromático, com a marca @codificandodireito).

```
node ferramentas/gerar-carrossel.js ferramentas/exemplo-post.json saida
```

Precisa de Node e do Playwright com Chromium. Usa as fontes Inter, Inter Display e DejaVu Sans Mono instaladas no sistema.
Tipos de slide: `capa`, `texto`, `lista`, `alerta`, `curso`, `final` (veja o início do arquivo).
Textos entre `**asteriscos**` saem em negrito. O script avisa quando um slide tem texto demais.
