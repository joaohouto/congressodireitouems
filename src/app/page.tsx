"use client";

import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Calendar,
  CalendarCheck,
  ChevronRight,
  ClipboardPen,
  Clock,
  FileText,
  FormInputIcon,
  MapPin,
  PresentationIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeftBranchIcon } from "@/components/icon/left-branch";
import { RightBranchIcon } from "@/components/icon/right-branch";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";

const SCHEDULE = [
  {
    date: "2025-11-03T00:00",
    events: [
      {
        time: "19:00",
        category: "Palestra",
        local: "Auditório da UEMS",
        title:
          "Direito Fundamental ao meio ambiente ecologicamente equilibrado: as contribuições da ecopedagogia contra a lógica expropriatória",
        person: "Prof. Dr. Ricardo Matos de Souza",
        bio: "Professor do Curso de Direito UFMS/Câmpus do Pantanal. Doutor em Direitos e Garantias Fundamentais pela Faculdade de Direito de Vitória (CAPES 5). Mestre em Sociologia Política pela Universidade de Vila Velha. Membro do Grupo de Biogep, do Programa de Pós Graduação Strictu Sensu da Faculdade de Direito de Vitória.",
        avatar: "/img/palestrantes/ricardo.jpg",
      },
      {
        time: "20:30",
        category: "Show",
        local: "Auditório da UEMS",
        title:
          "HISTÓRIA CANTADA - A história recente do Brasil contada pela música brasileira",
        person: "Banda Calli e Lauro Swensson",
        bio: `Uma "palestra musical" com duração de 90 minutos versando sobre a história recente do Brasil, especialmente seus períodos de autoritarismo e redemocratização, contada a partir da música popular brasileira (MPB) e de outros gêneros musicais.
        **Banda Calli e Lauro Swensson:** Lauro Swensson (Vocal), Patrícia Cerri (Vocal), Silvio Silva (Guitarra Vocal), Fábio Silva (Baixo Vocal), Cleber Antunes (Bateria).

        `,
        avatar: "/img/palestrantes/banda.jpg",
      },
    ],
  },
  {
    date: "2024-11-12",
    events: [
      {
        time: "19:00",
        category: "Palestra",
        local: "Auditório da UEMS",
        title:
          "O Corredor Rodoviário Bioceânico e seus impactos ao meio ambiente",
        person: "Prof. Dra. Isabelle Dias Carneiro Santos",
        bio: "Professora Adjunta na Universidade Federal do Mato Grosso do Sul\nDoutora em Direito Político e Econômico pela Universidade Presbiteriana Mackenzie\nPós doutoranda em Direito Internacional e Comparado pela Universidade de São Paulo",
        avatar: "/img/palestrantes/isabelle.jpg",
      },
      {
        time: "20:30",
        category: "Palestra",
        local: "Auditório da UEMS",
        title: "O Estado contra os Kaiowá e Guarani",
        person: "Prof. Dr. Lauro Joppert Swensson Junior",
        bio: "Possui graduação em Direito pela Universidade de São Paulo - USP (2002), mestrado em Filosofia do Direito pela Universidade Metodista de Piracicaba - Unimep (2005), mestrado em Antropologia Sociocultural pela Universidade Federal da Grande Dourados - UFGD (2023), doutorado em Direito junto ao departamento de Filosofia do Direito e Ciências Criminais da Johann Wolfgang Goethe-Universität (Alemanha). Atualmente é professor adjunto da Faculdade de Direito da Universidade Estadual de Mato Grosso do Sul (UEMS), campi Naviraí e Dourados. É compositor, tendo vencido, juntamente com a Banda Calli, a última edição do Festival Universitário da Canção, da Universidade Federal de Mato Grosso do Sul  (FUC UFMS 2023).",
        avatar: "/img/palestrantes/lauro.jpg",
      },
    ],
  },
  {
    date: "2024-11-13",
    events: [
      {
        time: "19:00",
        category: "Minicurso",
        local: "Auditório da UEMS",
        title: "Os instrumentos jurisdicionais de proteção socioambiental",
        person: "Dr. Luciano Pedro Beladelli",
        bio: "Juiz de Direito. Graduado em Direito pela UCDB – Universidade Católica Dom Bosco – Campo Grande, MS. Pós-graduado em Direito Processual – Grandes Transformações pela UNISUL – Universidade do Sul de Santa Catarina, Especialista em Direito Tributário pela Universidade Anhanguera – Uniderp – CG/MS, Pós-graduado em Direito Digital pelo Centro Universitário União das Américas – Foz do Iguaçu – PR, Especialista em Direitos Humanos pelo Centro Universitário União das Américas – Foz do Iguaçu – PR; Pós-graduado em Direito Civil, em Direito Eleitoral e em Criminologia Forense. O Dr. Luciano tem as seguintes publicações: Livro – título – Inovações do Direito Brasileiro: Institutos despenalizadores, Repercurssão Geral do Recurso Extraordinário e Tribunal Penal Internacional; e Livro: Pontos específicos de Direito Material e Processual. Juiz de Direito do TJMS – Exercendo o cargo desde 22/06/2011 – titular da Comarca de Anastácio desde 27/06/2014. É membro do Conselho Editoral de Pesquisa da Ejud – escola judicial – na gestão 2023/2024. Membro do grupo de trabalho da corregedoria para implementação de práticas para diminuição de acervo e conclusão de processos. Juiz colaborador da Coordenadoria da Mulher.",
        avatar: "/img/palestrantes/luciano.jpg",
      },

      {
        time: "19:00",
        category: "Minicurso",
        local: "Auditório da UEMS",
        title: "Aposentadoria por idade rural",
        person: "Prof. Dr. Fernando Machado de Souza",
        bio: "Pós-Doutor em Fronteiras e Direitos Humanos - UFGD. Doutor em Direito pela Instituição Toledo de Ensino - ITE. Mestre em Direito pela Universidade Paranaense - UNIPAR. Especialista em Direito Previdenciário. Professor da Universidade Estadual de Mato Grosso do Sul - UEMS e do Centro Universitário da Grande Dourados - UNIGRAN. Advogado.",
        avatar: "/img/palestrantes/fernando.jpg",
      },
      {
        time: "20:30",
        category: "Trilha",
        local: "Unidade da UEMS Aquidauana",
        title: "Trilha dos Pirilampos",
        person: "Prof. Dr. Afrânio José Soriano Soares",
        bio: "Nos dias 13 e 14 de novembro, após os trabalhos, a partir das 20:30, ocorrerá a trilha dos Pirilampos, cuja saída ocorrerá na sede do CEMAP - Centro de Estudos em Meio Ambiente, Áreas Protegidas e Desenvolvimento Sustentável, localizado no interior da Unidade da UEMS de Aquidauana",
        avatar: "/img/palestrantes/afranio.png",
      },
    ],
  },
  {
    date: "2024-11-14",
    events: [
      {
        time: "19:00",
        category: "Apresentação de trabalhos",
        local: "Unidade da UEMS Aquidauana",
        title: "I Encontro Científico do Curso de Direito",
        person: "",
        bio: "",
        avatar: "",
      },
      {
        time: "20:30",
        category: "Trilha",
        local: "Unidade da UEMS Aquidauana",
        title: "Trilha dos Pirilampos",
        person: "Prof. Dr. Afrânio José Soriano Soares",
        bio: "Nos dias 13 e 14 de novembro, após os trabalhos, a partir das 20:30, ocorrerá a trilha dos Pirilampos, cuja saída ocorrerá na sede do CEMAP - Centro de Estudos em Meio Ambiente, Áreas Protegidas e Desenvolvimento Sustentável, localizado no interior da Unidade da UEMS de Aquidauana",
        avatar: "/img/palestrantes/afranio.png",
      },
    ],
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center">
      <div className="max-w-[600px] mx-auto my-auto p-8 flex flex-col items-center">
        <header className="flex flex-col items-center gap-6 py-10">
          <Image
            width={340}
            height={116}
            layout="contain"
            src="/logo.svg"
            alt="Congresso Jurídico"
          />

          <span className="flex items-center gap-2 font-semibold ">
            <LeftBranchIcon className="size-8 opacity-20" />
            <span className="text-primary">
              Direito Penal e Processual Penal
            </span>
            <RightBranchIcon className="size-8 opacity-20" />
          </span>

          <Button
            asChild
            className="h-12 w-[310px] rounded-full text-base font-semibold text-primary-foreground"
          >
            <Link href="/inscricao">
              <ClipboardPen />
              Faça sua Inscrição!
              <ChevronRight />
            </Link>
          </Button>
        </header>

        <div className="flex flex-col items-center gap-4">
          <h2 className="uppercase tracking-widest text-muted-foreground">
            Programação
          </h2>

          {SCHEDULE?.map((day) => (
            <Card key={day.date} className={`w-full`}>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight mb-2 text-primary flex items-center gap-2">
                  <Calendar className="size-6" />

                  {formatDate(day.date, "EEEE", {
                    locale: ptBR,
                  })}
                </CardTitle>
                <CardDescription>
                  {formatDate(day.date, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-4 ">
                  {day.events?.map((event) => (
                    <Dialog key={event.title}>
                      <DialogTrigger>
                        <div className="flex items-start gap-4">
                          <span className="text-sm bg-primary text-background py-1 px-2 rounded-full w-[52px] text-center text-balance font-semibold">
                            {event.time}
                          </span>
                          <div className="flex flex-col items-start justify-start">
                            <strong className="text-base font-semibold text-balance text-left">
                              {event.title}
                            </strong>
                            {!!event.person && (
                              <p className="text-sm text-balance text-left">
                                {event.person}
                              </p>
                            )}
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-h-[calc(100%-2rem)] w-[800px] overflow-y-auto flex flex-col md:flex-row">
                        {!!event.avatar && (
                          <Image
                            className="rounded-sm size-[200px] object-cover bg-muted"
                            src={event.avatar}
                            alt={event.person}
                            width={200}
                            height={200}
                          />
                        )}

                        <div className="">
                          <strong className="text-2xl font-semibold text-balance mb-4">
                            {event.title}
                          </strong>

                          {!!event.person && (
                            <p className="text-lg text-balance">
                              com <b>{event.person}</b>
                            </p>
                          )}

                          <ul className="flex flex-row flex-wrap gap-2 my-2 mb-6">
                            <li>
                              <Badge variant="secondary">
                                <PresentationIcon className="h-4 w-4" />
                                {event.category}
                              </Badge>
                            </li>

                            <li>
                              <Badge variant="secondary">
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </Badge>
                            </li>

                            <li>
                              <Badge variant="secondary">
                                <MapPin className="h-4 w-4 min-w-4" />
                                {event.local}
                              </Badge>
                            </li>
                          </ul>

                          <div className="prose prose-neutral mb-6">
                            <ReactMarkdown>{event.bio}</ReactMarkdown>
                          </div>

                          <Button variant="outline" className="rounded-full">
                            <CalendarCheck />
                            Salvar Programação na Agenda
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
