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
  scienceMeetingForm: "",
  showSchedule: true,
};

export const EVENT_SCHEDULE = [
  {
    date: "2025-11-12T00:00",
    events: [
      {
        time: "14:00",
        endTime: "17:00",
        category: "Apresentação de trabalhos",
        local: "Google Meet",
        title: "II Encontro Científico do Curso de Direito",
        person: "Comissão Científica",
        image: "/placeholder.png",
        bio: "",
      },
      {
        time: "19:00",
        endTime: "19:30",
        category: "",
        local: "Auditório da Câmara Municipal de Aquidauana",
        title: "Abertura do Congresso",
        person: "Alunos do Curso de Direito - UEMS Aquidauana",
        bio: "",
        image: "",
        ig: "https://www.instagram.com/direitoaquidauana/",
      },
      {
        time: "19:30",
        endTime: "20:30",
        category: "Palestra",
        local: "Auditório da Câmara Municipal de Aquidauana",
        title: "Patriarcado e a Violência Doméstica",
        person: "Prof. Dra. Andrea Flores",
        bio: "Advogada Criminalista. Doutora em Direito pela Pontifícia Universidade Católica de São Paulo (2008). Mestra em Direito pela Pontifícia Universidade Católica de São Paulo (2000). Graduada em Direito pela Universidade Católica Dom Bosco (1994).Graduada em letras -habilitação inglês pela Universidade Federal de Mato Grosso do Sul (1994), Professora da Universidade Católica Dom Bosco e professora efetiva da Universidade Federal de Mato Grosso do Sul, professora do programa de mestrado em Direitos Humanos da UFMS, Professora Emérita da UFMS, Conselheira Federal da OAB/MS (2022/2024).",
        image: "/palestrantes/andrea-flores.jpeg",
        ig: "https://www.instagram.com/andreaflores.adv/",
      },
      {
        time: "20:30",
        endTime: "22:00",
        category: "Palestra",
        local: "Auditório da Câmara Municipal de Aquidauana",
        title: "Direitos Fundamentais do Réu no Processo Penal",
        person: "Prof. Dra. Rejane Arruda",
        bio: "Advogada. Doutora e Mestre em Direito pela PUC/SP. Pós-Graduada em Direito Penal Econômico pela Universidade de Coimbra/IBCCrim. Professora do Mestrado em Direitos Humanos e da Graduação da UFMS. Professora de Processo Penal da Escola Superior da Magistratura de Mato Grosso do Sul e Diretora dos Institutos Vozes e Aprimore-Curadoria Jurídica.",
        image: "/palestrantes/rejane-arruda.jpeg",
        ig: "https://www.instagram.com/rejanealvesdearruda/",
      },
    ],
  },
  {
    date: "2025-11-13T00:00",
    events: [
      {
        time: "19:30",
        endTime: "20:30",
        category: "Palestra",
        local: "Auditório da Câmara Municipal de Aquidauana",
        title:
          "Tribunal do Júri: Princípios Constitucionais e Teses Recentes do STF",
        person: "Dr. João Meneghini Girelli",
        bio: `
Promotor de Justiça do Ministério Público do Estado do Mato Grosso do Sul

Máster em Processo Penal e Garantismo pela Universidade de Girona/ES
        `,
        image: "/palestrantes/joao-meneghini-girelli.jpeg",
      },
      {
        time: "21:30",
        endTime: "22:00",
        category: "Palestra",
        local: "Auditório da Câmara Municipal de Aquidauana",
        title: "Exame Criminológico: Psiquiatrização da Execução Penal",
        person: "Dr. Cahuê Duarte e Urdiales",
        bio: "Defensor Público. Titular da 6ª Defensoria Pública de Execução Penal de Campo Grande. Pós graduando em Direito Penal e Criminologia pelo ICPC.",
        image: "/palestrantes/cahue-duarte.jpeg",
      },
    ],
  },
  {
    date: "2025-11-14T00:00",
    events: [
      {
        time: "08:00",
        endTime: "12:00",
        category: "Apresentação de trabalhos",
        local: "Google Meet",
        title: "II Encontro Científico do Curso de Direito",
        person: "Comissão Científica",
        image: "/placeholder.png",
        bio: "",
      },
      {
        time: "19:30",
        endTime: "21:30",
        category: "Júri Simulado",
        local: "Auditório da Câmara Municipal de Aquidauana",
        title: "Júri Simulado",
        person: "Alunos do Curso de Direito - UEMS Aquidauana",
        bio: "",
        image: "",
        ig: "https://www.instagram.com/direitoaquidauana/",
      },
      {
        time: "21:30",
        category: "22:00",
        local: "Auditório da Câmara Municipal de Aquidauana",
        title: "Encerramento",
        person: "Alunos do Curso de Direito - UEMS Aquidauana",
        bio: "",
        image: "",
        ig: "https://www.instagram.com/direitoaquidauana/",
      },
    ],
  },
];

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
      badge: "NOVO",
    },

    {
      title:
        "RESULTADO DEFINITIVO DOS TRABALHOS SELECIONADOS E SALAS VIRTUAIS DE APRESENTAÇÃO",
      url: "/editais/2025/Resultado-Definitivo-dos-Trabalhos-Selecionados-e-Salas-Virtuais-de-Apresentação.pdf",
      badge: "NOVO",
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
