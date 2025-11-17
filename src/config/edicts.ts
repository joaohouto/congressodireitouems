interface Edital {
  title: string;
  url?: string;
  badge?: string;
  children?: Edital[];
}

export const EDICTS_BY_YEAR: Record<string, Edital[]> = {
  "2025": [
    {
      title:
        "EDITAL DE ABERTURA - III CONGRESSO JURÍDICO E II ENCONTRO CIENTÍFICO",
      url: "/editais/2025/Edital-de-Abertura-III-Congresso-Jurídico-e-II-Encontro-Científico.pdf",
      children: [
        {
          title:
            "ANEXO I - REGRAS PARA SUBMISSÃO DE RESUMO SIMPLES (100 A 500 PALAVRAS)",
          url: "/editais/2025/Edital-de-Abertura-III-Congresso-Jurídico-e-II-Encontro-Científico.pdf",
        },
        {
          title:
            "ANEXO II - REGRAS PARA CONFECÇÃO E SUBMISSÃO DO BANNER ELETRÔNICO",
          url: "/editais/2025/Edital-de-Abertura-III-Congresso-Jurídico-e-II-Encontro-Científico.pdf",
        },
        {
          title: "ANEXO III - MODELO DE RESUMO SIMPLES (COM ID)",
          url: "https://docs.google.com/document/d/1FcjoeHdP3bTUbax9aUxs_3jaXsif7lsxy5jQVE15VMU/edit?usp=sharing",
        },
        {
          title: "ANEXO IV - MODELO DE RESUMO SIMPLES (SEM ID)",
          url: "https://docs.google.com/document/d/1hR9nuE7tfQiU66ImVfrlAPLwG9Mv8I9W_81T6U_voFE/edit?usp=sharing",
        },
        {
          title: "ANEXO V - MODELO DE BANNER",
          url: "https://docs.google.com/presentation/d/10GhET99718sNNidjo-UJnBC5VLS6-Y_HOq-Lkdi2Cyc/edit?usp=sharing",
        },
      ],
    },

    {
      title:
        "SUBMISSÃO (RESUMO E BANNER) - II ENCONTRO CIENTÍFICO DO CURSO DE DIREITO",
      url: "https://forms.gle/W8Vx5Mfy8fed4jMw6",
    },

    {
      title:
        "RETIFICAÇÃO Nº 01/2025 - PRORROGAÇÃO DAS SUBMISSÕES DO II ENCONTRO CIENTÍFICO",
      url: "/editais/2025/Retificação-N-01-2025-Prorrogação-das-Submissões-II-Encontro-Científico.pdf",
    },

    {
      title: "TRABALHOS APROVADOS E REPROVADOS - II ENCONTRO CIENTÍFICO",
      url: "/editais/2025/Trabalhos-Aprovados-e-Reprovados-II-Encontro-Científico.pdf",
    },

    {
      title: "SUBMISSÃO DE RESUMO/BANNER RETIFICADO",
      url: "https://forms.gle/GpWSUFyyC5M1wF8L8",
    },

    {
      title: "RETIFICAÇÃO Nº 02/2025 - CRONOGRAMA DE APRESENTAÇÕES",
      url: "/editais/2025/Retificação-N-02-2025-Cronograma-de-Apresentações.pdf",
    },

    {
      title:
        "RESULTADO DEFINITIVO DOS TRABALHOS SELECIONADOS E SALAS VIRTUAIS DE APRESENTAÇÃO",
      url: "/editais/2025/Resultado-Definitivo-dos-Trabalhos-Selecionados-e-Salas-Virtuais-de-Apresentação.pdf",
    },
  ],
  "2024": [
    {
      title:
        "EDITAL PARA INSCRIÇÃO NO CONGRESSO E SUBMISSÃO DE TRABALHOS CIENTÍFICOS",
      url: "/editais/2024/EDITAL PARA INSCRIÇÃO NO CONGRESSO E SUBMISSÃO DE TRABALHOS CIENTÍFICOS.pdf",
      children: [
        {
          title: "ANEXO I - REGRAS PARA SUBISSÃO DE RESUMO SIMPLES",
          url: "/editais/2024/ANEXO I - REGRAS PARA SUBISSÃO DE RESUMO SIMPLES.pdf",
        },
        {
          title: "ANEXO II - MODELO DE RESUMO SIMPLES",
          url: "/editais/2024/ANEXO II - MODELO DE RESUMO SIMPLES.docx",
        },
        {
          title: "ANEXO III - REGRAS PARA CONFECÇÃO DE BANNER ELETRÔNICO",
          url: "/editais/2024/ANEXO III - REGRAS PARA CONFECÇÃO DE BANNER ELETRÔNICO.pdf",
        },
        {
          title:
            "ANEXO IV - REGRAS GERAIS PARA ACESSO AS ÁREAS DE MATAS DA UEMS AQUIDAUANA",
          url: "/editais/2024/ANEXO IV - REGRAS GERAIS PARA ACESSO AS ÁREAS DE MATAS DA UEMS AQUIDAUANA.pdf",
        },
        {
          title: "ANEXO V - MODELO DE BANNER ELETRÔNICO",
          url: "/editais/2024/ANEXO V - MODELO DE BANNER ELETRÔNICO.pptx",
        },
      ],
    },
    {
      title: "RESUMOS SIMPLES APROVADOS",
      url: "/editais/2024/RESUMOS SIMPLES APROVADOS.pdf",
    },
    {
      title: "LOCAL DE APRESENTAÇÃO E AVALIADORES",
      url: "/editais/2024/LOCAL DE APRESENTAÇÃO E AVALIADORES.pdf",
    },
    {
      title: "ANAIS - I ENCONTRO CIENTÍFICO DO CURSO DE DIREITO",
      url: "/editais/2024/Anais - I Encontro Científico - Direito UEMS Aquidauana.pdf",
    },
  ],
};
