export const appConfig = {
  title: "III Congresso Jurídico do Curso de Direito da UEMS - Aquidauana",
  ogImage: "/og.png",
  shortTitle: "III Congresso Jurídico",
  theme: "Direito Penal em Debate: Perspectivas e Tendências",
  fullDate: "de 12 a 14 de novembro de 2025",
  place: "Câmara Municipal de Aquidauana/MS",
  description: "",
  instagram: "congressodireitouems",
  email: "nao-responda@joaocouto.com",
  subscriptionForm: "https://forms.gle/Aov3CPTD1YGGrSmx6",
  scienceMeetingForm: "https://forms.gle/W8Vx5Mfy8fed4jMw6",
  showSchedule: false,
};

export const EVENT_SCHEDULE = [
  {
    date: "2025-11-12T00:00",
    events: [
      {
        time: "19:00",
        category: "Palestra",
        local: "Auditório da Câmara Municipal de Aquidauana",
        title: "----",
        person: "Dr. João Meneghini Girelli",
        bio: "",
        image: "",
      },
    ],
  },
  {
    date: "2025-11-13T00:00",
    events: [],
  },
  {
    date: "2025-11-14T00:00",
    events: [
      {
        time: "19:00",
        category: "Apresentação de trabalhos",
        local: "Google Meet",
        title: "II Encontro Científico do Curso de Direito",
        person: "",
        bio: "",
        image: "/placeholder.png",
      },
    ],
  },
];

export const SUBSCRIPTION_CATEGORIES = [
  {
    value: "Acadêmico de Direito (UEMS Aquidauana)",
    label: "🎓 Acadêmico de Direito (UEMS Aquidauana)",
  },
  {
    value: "Acadêmico de Direito - UEMS (2º ano)",
    label: "🎓 Acadêmico de Direito (Outras Insituições)",
  },
  {
    value: "Profissional",
    label: "💼 Profissional",
  },
];

interface Edital {
  title: string;
  url?: string;
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
