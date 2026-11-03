// Gera as imagens de um carrossel do @codificandodireito (1080 x 1350, monocromático).
// Uso: node gerar-carrossel.js post.json pasta-de-saida
// post.json: { "tema": "Golpes", "horario": "7h", "slides": [ {tipo, ...} ], "legenda": "...", "referencias": ["..."] }
// Tipos de slide:
//   capa     { titulo, subtitulo }
//   texto    { titulo, texto }
//   lista    { titulo, itens: ["...", "..."] }
//   alerta   { texto }                                  (frase curta, fundo preto)
//   curso    { nome, instituicao, modalidade, prazo: "AAAA-MM-DD", detalhe }
//   final    { titulo, texto }                          (chamada para o link da bio)
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");

const [, , entrada, saida] = process.argv;
const post = JSON.parse(fs.readFileSync(entrada, "utf8"));
fs.mkdirSync(saida, { recursive: true });

const MESES = ["jan.","fev.","mar.","abr.","maio","jun.","jul.","ago.","set.","out.","nov.","dez."];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\n/g, "<br>");

const PINHEIRO = cor => `<svg width="44" height="51" viewBox="0 0 200 230" fill="none" stroke="${cor}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"><polyline points="62,70 100,22 138,70"/><polyline points="44,122 100,58 156,122"/><polyline points="24,176 100,96 176,176"/><line x1="100" y1="150" x2="100" y2="214"/><line x1="128" y1="214" x2="152" y2="214"/></svg>`;

const CSS = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px}
body{font-family:"Inter","DejaVu Sans",sans-serif;-webkit-font-smoothing:antialiased}
.s{width:1080px;height:1350px;padding:96px 96px 0;display:flex;flex-direction:column;position:relative}
.claro{background:#F6F6F4;color:#111}
.escuro{background:#111;color:#F6F6F4}
.mono{font-family:"DejaVu Sans Mono",monospace;letter-spacing:2px;text-transform:uppercase;font-size:24px}
.disp{font-family:"Inter Display","Inter",sans-serif;font-weight:800;letter-spacing:-0.035em;line-height:.98}
.top{display:flex;justify-content:space-between;align-items:center;padding-bottom:28px;border-bottom:2px solid currentColor}
.body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:40px}
.foot{display:flex;justify-content:space-between;align-items:center;height:150px;border-top:2px solid currentColor;margin-top:24px}
.foot .h{display:flex;align-items:center;gap:18px;font-family:"DejaVu Sans Mono",monospace;font-size:28px;letter-spacing:0}
.foot .h b{font-weight:700}
h1{font-size:118px}
h2{font-size:78px}
p{font-size:44px;line-height:1.35;font-weight:400}
p b, li b{font-weight:700}
.sub{font-size:46px;line-height:1.3;opacity:.72;font-weight:400}
ul{list-style:none;display:flex;flex-direction:column;gap:30px}
li{display:grid;grid-template-columns:72px 1fr;font-size:42px;line-height:1.3}
li .n{font-family:"DejaVu Sans Mono",monospace;font-size:28px;padding-top:10px;opacity:.6}
.alert{font-size:96px}
.card{border:3px solid currentColor;display:grid;grid-template-columns:230px 1fr}
.date{background:#F6F6F4;color:#111;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:36px}
.date .d{font-size:120px}
.date .m{font-family:"DejaVu Sans Mono",monospace;font-size:34px}
.date .y{font-family:"DejaVu Sans Mono",monospace;font-size:24px;opacity:.6}
.info{padding:40px;display:flex;flex-direction:column;gap:18px}
.info h3{font-family:"Inter Display","Inter",sans-serif;font-weight:700;font-size:52px;line-height:1.08;letter-spacing:-.02em}
.info p{font-size:34px;opacity:.8}
.pill{display:inline-block;border:2px solid currentColor;padding:12px 20px;font-family:"DejaVu Sans Mono",monospace;font-size:26px;letter-spacing:1px}
.swipe{font-family:"DejaVu Sans Mono",monospace;font-size:30px}
`;

function slideHTML(s, i, total) {
  const escuro = ["capa", "alerta", "curso", "final"].includes(s.tipo);
  const cor = escuro ? "#F6F6F4" : "#111";
  const n = `${String(i + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  let miolo = "";
  if (s.tipo === "capa") {
    miolo = `<h1 class="disp">${rich(s.titulo)}</h1>${s.subtitulo ? `<p class="sub">${rich(s.subtitulo)}</p>` : ""}`;
  } else if (s.tipo === "texto") {
    miolo = `<h2 class="disp">${rich(s.titulo)}</h2><p>${rich(s.texto)}</p>`;
  } else if (s.tipo === "lista") {
    miolo = `<h2 class="disp">${rich(s.titulo)}</h2><ul>${s.itens.map((t, k) => `<li><span class="n">${String(k + 1).padStart(2, "0")}</span><span>${rich(t)}</span></li>`).join("")}</ul>`;
  } else if (s.tipo === "alerta") {
    miolo = `<p class="disp alert">${rich(s.texto)}</p>`;
  } else if (s.tipo === "curso") {
    const d = s.prazo ? new Date(s.prazo + "T00:00:00") : null;
    const data = d ? `<span class="d disp">${String(d.getDate()).padStart(2, "0")}</span><span class="m">${MESES[d.getMonth()]}</span><span class="y">${d.getFullYear()}</span>` : `<span class="m">ANO TODO</span>`;
    miolo = `<span class="mono">Curso gratuito · inscrições abertas</span>
      <div class="card"><div class="date"><span class="mono" style="font-size:20px;margin-bottom:12px">até</span>${data}</div>
      <div class="info"><span class="mono" style="font-size:22px;opacity:.7">${esc(s.modalidade || "")}</span><h3>${esc(s.nome)}</h3><p>${esc(s.instituicao)}</p>${s.detalhe ? `<p>${rich(s.detalhe)}</p>` : ""}</div></div>
      <p class="sub">Link e todos os detalhes no <b>link da bio</b>.</p>`;
  } else if (s.tipo === "final") {
    miolo = `${PINHEIRO(cor).replace('width="44" height="51"', 'width="120" height="138"')}<h2 class="disp">${rich(s.titulo || "Salva e compartilha.")}</h2><p class="sub">${rich(s.texto || "Cursos gratuitos e oportunidades de educação no **link da bio**.")}</p>`;
  }
  const topoDir = s.tipo === "capa" ? `<span class="swipe">arraste →</span>` : `<span class="mono" style="font-size:22px">${n}</span>`;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>${CSS}</style></head><body>
  <section class="s ${escuro ? "escuro" : "claro"}">
    <div class="top"><span class="mono" style="font-size:22px">${esc(post.tema)}</span>${topoDir}</div>
    <div class="body">${miolo}</div>
    <div class="foot"><span class="h">${PINHEIRO(cor)}<span><b>codificando</b>direito</span></span><span class="mono" style="font-size:24px;letter-spacing:0;text-transform:none">@codificandodireito</span></div>
  </section></body></html>`;
}

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const total = post.slides.length;
  for (let i = 0; i < total; i++) {
    await p.setContent(slideHTML(post.slides[i], i, total), { waitUntil: "load" });
    // alerta se algum texto vazar da área útil
    const vaza = await p.evaluate(() => { const c = document.querySelector(".body"); return c.scrollHeight > c.clientHeight + 2; });
    if (vaza) console.warn(`AVISO: o slide ${i + 1} tem texto demais; encurte ou divida em dois.`);
    await p.screenshot({ path: path.join(saida, `${String(i + 1).padStart(2, "0")}.png`) });
  }
  await b.close();
  const refs = (post.referencias || []).map(r => "- " + r).join("\n");
  fs.writeFileSync(path.join(saida, "legenda.txt"), `${post.legenda || ""}\n\n---\nHorário sugerido: ${post.horario || "-"}\n\nReferências (ABNT NBR 6023):\n${refs}\n`);
  console.log(`OK: ${total} slides em ${saida}`);
})();
