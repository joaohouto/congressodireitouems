export const appConfig = {
  title: "IV Congresso Jurídico do Curso de Direito da UEMS - Aquidauana",
  shortTitle: "IV Congresso Jurídico",
  description:
    "IV Congresso Jurídico do Curso de Direito da UEMS - Aquidauana. De 04 a 06 de novembro de 2026. Palestras, Encontro Científico, debates e discussões sobre Direito na Era Digital, Novas Tecnologias e Inteligência Artificial.",
  siteUrl:
    process.env.NEXT_PUBLIC_HOSTNAME &&
    !process.env.NEXT_PUBLIC_HOSTNAME.includes("localhost")
      ? process.env.NEXT_PUBLIC_HOSTNAME
      : "https://congressodireitouems.com.br",
  ogImage: "/og.png",
  keywords: [
    "Congresso Jurídico",
    "Direito UEMS",
    "UEMS Aquidauana",
    "Encontro Científico Direito",
    "Direito na Era Digital",
    "Inteligência Artificial e Direito",
    "Palestras Jurídicas",
    "Júri Simulado UEMS",
    "Aquidauana Mato Grosso do Sul",
    "Evento Jurídico 2026",
  ],

  theme: "Direito na Era Digital, Novas Tecnologias e Inteligência Artificial",
  fullDate: "de 04 a 06 de novembro de 2026",
  place: "Auditório da UEMS Aquidauana",
  placeAddress:
    "Rodovia Graziela Maciel Barroso, Km 12 Zona Rural - Camisão, Aquidauana/MS",
  placeImage: "/uems-aquidauana.jpg",
  placeCoordinates: {
    lat: -20.456496,
    lng: -55.66988,
  },

  instagram: "congressodireitouems",
  email: "nao-responda@joaocouto.com",

  subscriptionForm: "https://forms.gle/RZ4NheTcy5HDLg628",
  subscriptionStart: "2026-09-14T00:00",
  subscriptionEnd: "2026-11-03T23:59",

  showTheme: true,
  showDateAndPlace: true,
  showSchedule: true,
  showLocation: true,
  showSponsors: false,
  allowGenerateTicket: true,
};

export const SCIENCE_MEETING = {
  edition: "III",

  submissionForm: "https://forms.gle/Kr5zFwUQ8EM1Poyq6",
  submissionStart: "2026-09-14T00:00",
  submissionEnd: "2026-10-16T23:59",

  sessions: [
    {
      date: "2026-11-05T00:00",
      time: "14:00",
      endTime: "17:00",
      local: "Google Meet",
      link: "",
    },
    {
      date: "2026-11-06T00:00",
      time: "14:00",
      endTime: "17:00",
      local: "Google Meet",
      link: "",
    },
  ],
};

const OTHER_EVENTS_BY_DATE: Record<string, EventScheduleItem[]> = {
  "2026-11-04T00:00": [
    {
      time: "19:00",
      endTime: "19:30",
      category: "",
      local: "Auditório da UEMS Aquidauana",
      title: "Abertura do Congresso",
      person: "Alunos do Curso de Direito - UEMS Aquidauana",
      bio: "",
      image: "",
      ig: "https://www.instagram.com/direitoaquidauana/",
    },

    {
      time: "19:30",
      endTime: "21:00",
      category: "Palestra",
      local: "Auditório da UEMS Aquidauana",
      title:
        "Direito e complexidade na sociedade da informação: mídias sociais, IA e os limites da interpretação jurídica",
      person: "Prof. Dr. Ulisses Schwarz Viana",
      bio: "Doutor em Filosofia e Teoria Geral do Direito pela Faculdade de Direito da Universidade de São Paulo (USP). Mestre em Direito Constitucional pela Escola de Direito de Brasília do Instituto Brasiliense de Direito Público (IDP). Procurador do Estado de Mato Grosso do Sul (atuação junto ao STF e Tribunais Superiores). Membro da Comissão Especial de Defesa da Federação do Conselho Federal da OAB (CFOAB). Presidente da Câmara Técnica do CONPEG (Colégio Nacional de Procuradores-Gerais dos Estados e do DF). Professor do Programa de Mestrado e Doutorado Acadêmico em Direito da Escola de Direito de Brasília (EDB) do Instituto Brasiliense de Direito Público (IDP). Professor na Graduação e na Pós-graduação da Escola de Direito de Brasília (EDB) do Instituto Brasiliense de Direito Público. Professor de Direito Tributário na Pós-Graduação da Fundação Escola Superior do Ministério Público do Distrito Federal e Territórios. Pesquisador Visitante na Pennsylvania State University (Penn State University), Dickinson School of Law (2016).",
      image: "/palestrantes/ulisses-schwarz.jpeg",
      ig: "",
    },

    {
      time: "21:00",
      endTime: "22:30",
      category: "Palestra",
      local: "Auditório da UEMS Aquidauana",
      title:
        "Direito e Novas Tecnologias: entre a regulação necessária e o excesso normativo",
      person: "Prof. Dr. Diego Bianchi de Oliveira",
      bio: "Doutor em Direito pela UNIMAR (2023). Mestre em Direito Processual e Cidadania pela UNIPAR (2016). Especialista em Metodologia do Ensino Superior pela FACUMINAS (2024) e em Direito Imobiliário pela UCAM (2014). Graduado em Direito pela UEMS (2013) e em Administração pela UNIDERP (2009). Professor Titular do curso de Direito e do Mestrado em Direito Processual e Cidadania da Universidade Paranaense - UNIPAR e Professor Efetivo do curso de Direito da Universidade Estadual de Mato Grosso do Sul - UEMS. É editor-chefe da Revista de Ciências Jurídicas e Sociais da UNIPAR.",
      image: "/palestrantes/diego-bianchi.jpeg",
      ig: "https://www.linkedin.com/in/odiegobianchi/",
    },
  ],

  "2026-11-05T00:00": [
    {
      time: "19:00",
      endTime: "20:30",
      category: "Palestra",
      local: "Auditório da UEMS Aquidauana",
      title: "A IA pode escrever a petição. Mas pode formar o jurista?",
      person: "Dra. Luiza C. C. Faccin Duarte",
      bio: "Advogada desde 2009, atuando no jurídico contencioso e consultivo. Head de inovação e responsável pela carteira de Direito Digital do escritório Newley Advogados.\n\nMestre em Direito Privado Europeu, Inteligência Artificial e Direitos Fundamentais pela Università Mediterranea Reggio Calabria (Itália). Especialista em Direito Constitucional. Pós-graduada em Compliance e Direito Digital, com foco em Proteção de Dados. Especialista em Direito Penal, Processo Penal, Corrupção e Democracia. Membro da I2AI - International Association of Artificial Intelligence. Membro da FOR HUMANITY. Diretora do Comitê de Inovação e Novas Tecnologias da Associação Nacional dos Advogados de Direito Digital – ANADD. Segunda Secretária da ANADD. Diretora Eleita na Associação dos Advogados independentes.\n\nEmail: [luizaccfaccin@gmail.com](mailto:luizaccfaccin@gmail.com)",
      image: "/palestrantes/luiza-faccin.jpeg",
      ig: "https://www.instagram.com/lufaccin/",
    },

    {
      time: "20:30",
      endTime: "22:00",
      category: "Palestra",
      local: "Auditório da UEMS Aquidauana",
      title: "O futuro da advocacia criminal na era da inteligência artificial",
      person: "Dr. Tiago Bunning",
      bio: "Advogado\nMestre em Ciências Criminais pela PUCRS\nConselheiro Seccional da OAB/MS\nCoordenador Estadual do IBCCRIM",
      image: "/palestrantes/tiago-bunning.jpeg",
      ig: "https://www.instagram.com/tiagobunning/",
    },
  ],

  "2026-11-06T00:00": [
    {
      time: "19:00",
      endTime: "21:30",
      category: "Júri Simulado",
      local: "Auditório da UEMS Aquidauana",
      title: "Júri Simulado",
      person: "Alunos do Curso de Direito - UEMS Aquidauana",
      bio: "",
      image: "",
      ig: "https://www.instagram.com/direitoaquidauana/",
    },
    {
      time: "21:30",
      endTime: "22:00",
      category: "",
      local: "Auditório da UEMS Aquidauana",
      title: "Encerramento",
      person: "Alunos do Curso de Direito - UEMS Aquidauana",
      bio: "",
      image: "",
      ig: "https://www.instagram.com/direitoaquidauana/",
    },
  ],
};

export const EVENT_SCHEDULE: DaySchedule[] = buildEventSchedule();

// ============================================================================
// Tipagens e Helpers
// ============================================================================

function buildEventSchedule(): DaySchedule[] {
  const eventsByDate = new Map<string, EventScheduleItem[]>();

  for (const [date, events] of Object.entries(OTHER_EVENTS_BY_DATE)) {
    eventsByDate.set(date, [...events]);
  }

  for (const session of SCIENCE_MEETING.sessions) {
    const event: EventScheduleItem = {
      time: session.time,
      endTime: session.endTime,
      category: "Apresentação de trabalhos",
      local: session.local,
      title: `${SCIENCE_MEETING.edition} Encontro Científico do Curso de Direito`,
      person: "Comissão Científica",
      image: "/placeholder.png",
      bio: "",
      link: session.link,
    };

    eventsByDate.set(session.date, [
      ...(eventsByDate.get(session.date) ?? []),
      event,
    ]);
  }

  return Array.from(eventsByDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, events]) => ({
      date,
      events: events.sort((a, b) => a.time.localeCompare(b.time)),
    }));
}

export type AppConfig = typeof appConfig;
export type ScienceMeetingConfig = typeof SCIENCE_MEETING;

export interface ScienceMeetingSession {
  date: string;
  time: string;
  endTime: string;
  local: string;
  link?: string;
}

export interface EventScheduleItem {
  time: string;
  endTime: string;
  category: string;
  local: string;
  title: string;
  person: string;
  bio: string;
  image: string;
  ig?: string;
  link?: string;
}

export interface DaySchedule {
  date: string;
  events: EventScheduleItem[];
}
