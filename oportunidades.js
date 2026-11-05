/* =========================================================
   ÁREA DE ATUALIZAÇÃO

   ATUALIZADO: data da última revisão do quadro (AAAA-MM-DD).

   Cada oportunidade é um bloco { }:
   titulo, instituicao (nome por extenso + sigla)
   tipo: "Curso livre", "Idiomas", "Técnico", "Graduação",
         "Pós-graduação", "Mestrado", "Doutorado" ou "Concurso"
   modalidade: "A distância", "Presencial" ou "Semipresencial"
   local: "Todo o Brasil" ou a cidade (ex.: "Porto Velho, RO")
   duracao, vagas, publico, taxa (concursos): opcionais
   prazo: último dia de inscrição (AAAA-MM-DD). Sem prazo? apague a linha.
   link: endereço oficial

   Referência ABNT (preenchida automaticamente a partir de):
   autor: entidade em MAIÚSCULAS, como na NBR 6023
   obra: título do documento ou da página oficial
   cidade e editora (sigla da entidade), ano
   ========================================================= */
window.ATUALIZADO = "2026-11-05";

window.OPORTUNIDADES = [
  { titulo: "Especialização em Projetos de Empreendedorismo e Inovação para Educadores",
    instituicao: "Universidade Federal de Uberlândia (UFU)", tipo: "Pós-graduação",
    modalidade: "A distância", local: "Todo o Brasil", duracao: "360 h, em 18 meses", vagas: "150",
    publico: "Professores e profissionais da educação, preferencialmente da rede pública.",
    prazo: "2026-11-06", link: "https://fagen.ufu.br/unidades/especializacao/projetos-de-empreendedorismo-e-inovacao-para-educadores",
    autor: "UNIVERSIDADE FEDERAL DE UBERLÂNDIA. Faculdade de Gestão e Negócios",
    obra: "Especialização em Projetos de Empreendedorismo e Inovação para Educadores", cidade: "Uberlândia", editora: "UFU", ano: "2026" },

  { titulo: "Técnico em Administração a distância (concomitante e subsequente)",
    instituicao: "Instituto Federal de Educação, Ciência e Tecnologia Goiano (IF Goiano)", tipo: "Técnico",
    modalidade: "A distância", local: "Campus Ipameri, GO", duracao: "1.050 h, em 3 semestres", vagas: "100",
    publico: "Quem concluiu ou está no 3º ano do ensino médio. Sem taxa e sem prova: seleção por sorteio em 19 nov. 2026. Pode haver estágio e visitas técnicas ligados ao campus de Ipameri.",
    prazo: "2026-11-12", link: "https://ps.ifgoiano.edu.br/edital/visualizar/717/",
    autor: "INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA GOIANO",
    obra: "Edital nº 12, de 28 de outubro de 2026: processo seletivo Técnico em Administração EaD: Campus Ipameri", cidade: "Ipameri", editora: "IF Goiano", ano: "2026" },

  { titulo: "Cursos técnicos subsequentes a distância (24 cursos)",
    instituicao: "Instituto Federal de Educação, Ciência e Tecnologia de Rondônia (IFRO)", tipo: "Técnico",
    modalidade: "A distância", local: "Polos do IFRO em Rondônia", vagas: "500, distribuídas em 30 cursos",
    publico: "Concluintes do ensino médio. Inscrição sem taxa.",
    prazo: "2026-12-13", link: "https://selecao.ifro.edu.br/unificado",
    autor: "INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE RONDÔNIA",
    obra: "Processo Seletivo Unificado 2027/1", cidade: "Porto Velho", editora: "IFRO", ano: "2026" },

  { titulo: "Cursos de graduação 2027/1",
    instituicao: "Instituto Federal de Educação, Ciência e Tecnologia de Rondônia (IFRO)", tipo: "Graduação",
    modalidade: "Presencial", local: "Porto Velho, RO (campi Calama e Zona Norte) e outros 8 municípios", vagas: "1.306",
    publico: "Em Porto Velho: Sistemas para Internet, Análise e Desenvolvimento de Sistemas, Pedagogia, Gestão Pública, engenharias, entre outros.",
    prazo: "2026-12-13", link: "https://selecao.ifro.edu.br/unificado/2056-edital-n-08-2026-processo-seletivo-2027-1-cursos-graduacao",
    autor: "INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE RONDÔNIA",
    obra: "Edital nº 08/2026: processo seletivo 2027/1: cursos de graduação", cidade: "Porto Velho", editora: "IFRO", ano: "2026" },

  { titulo: "Cursos livres a distância: Plataforma Aprenda Mais (298 cursos)",
    instituicao: "Instituto Federal de Educação, Ciência e Tecnologia do Rio Grande do Sul (IFRS)", tipo: "Curso livre",
    modalidade: "A distância", local: "Todo o Brasil",
    publico: "Aberto ao público. Exemplos: Inglês 1, Espanhol 1, Direito do Trabalho, Contabilidade Básica, Oratória.",
    prazo: "2026-12-31", link: "https://estude.ifrs.edu.br/inscricoes-abertas/cursos-ead-2025-plataforma-aprenda/",
    autor: "INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DO RIO GRANDE DO SUL",
    obra: "Cursos EaD 2026: Plataforma Aprenda Mais", cidade: "Bento Gonçalves", editora: "IFRS", ano: "2026" },

  { titulo: "Cursos livres com certificado: Escola Virtual de Governo",
    instituicao: "Escola Nacional de Administração Pública (Enap)", tipo: "Curso livre",
    modalidade: "A distância", local: "Todo o Brasil",
    publico: "Aberto a qualquer pessoa. Cursos em gestão, tecnologia, direito, entre outras áreas.",
    link: "https://www.escolavirtual.gov.br/",
    autor: "ESCOLA NACIONAL DE ADMINISTRAÇÃO PÚBLICA",
    obra: "Escola Virtual de Governo", cidade: "Brasília, DF", editora: "Enap", ano: "[2026]" }
];
