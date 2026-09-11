export const appConfig = {
  title: "IV Congresso Jurídico do Curso de Direito da UEMS - Aquidauana",
  shortTitle: "IV Congresso Jurídico",
  description: "",
  ogImage: "/og.png",

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
  showSchedule: false,
  showLocation: true,
  showSponsors: false,
  allowGenerateTicket: false,
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
      category: "",
      local: "Auditório da UEMS Aquidauana",
      title: "Palestra",
      person: "Ulisses Swchartz",
      bio: "",
      image: "",
      ig: "",
    },

    {
      time: "21:00",
      endTime: "22:30",
      category: "",
      local: "Auditório da UEMS Aquidauana",
      title: "Palestra",
      person: "Diego Bianchi",
      bio: "",
      image: "",
      ig: "https://www.linkedin.com/in/odiegobianchi/",
    },
  ],

  "2026-11-05T00:00": [
    {
      time: "19:00",
      endTime: "20:30",
      category: "",
      local: "Auditório da UEMS Aquidauana",
      title: "Palestra",
      person: "Luiza Faccin",
      bio: "",
      image: "",
      ig: "https://www.instagram.com/lufaccin/",
    },

    {
      time: "20:30",
      endTime: "22:00",
      category: "",
      local: "Auditório da UEMS Aquidauana",
      title: "Palestra",
      person: "Tiago Bunning",
      bio: "",
      image: "",
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
