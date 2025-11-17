import * as React from "react";
import {
  Html,
  Tailwind,
  Head,
  Body,
  Container,
  Img,
  Text,
  Hr,
  Row,
  Column,
  Button,
  Link,
} from "@react-email/components";

import { appConfig } from "@/config/app";
import { Calendar, Ticket } from "lucide-react";

interface EmailTemplateProps {
  id: string;
  email: string;
  name: string;
  category: string;
}

export const SubscriptionEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ id, name, category }) => (
  <Html lang="pt-Br">
    <Head />
    <Tailwind>
      <Body className="mx-auto my-auto bg-gray-50 font-sans">
        <Container className="my-[40px] rounded p-8 shadow-sm">
          <Img
            src={`${process.env.NEXT_PUBLIC_HOSTNAME}/banner.png`}
            alt={appConfig.title}
            className="w-full rounded"
          />
          <Text className="mb-3 text-2xl font-bold text-gray-800">
            Olá, <b>{name}</b>!
          </Text>
          <Text className="text-gray-700">
            Estamos felizes em confirmar sua inscrição no {appConfig.title}, que
            ocorrerá <b>{appConfig.fullDate}</b>.
          </Text>
          <ul className="list-disc pl-4 text-gray-700">
            <li>
              <b>Tema:</b> {appConfig.theme}
            </li>
            <li>
              <b>Local:</b> {appConfig.place}
            </li>
          </ul>

          <Text className="my-4 font-semibold text-gray-800">
            Sua inscrição
          </Text>
          <ul className="list-disc pl-4 text-gray-700">
            <li>
              Nome: <b>{name}</b>
            </li>
            <li>
              Categoria: <b>{category}</b>
            </li>
          </ul>

          <Row className="mt-6">
            <Column align="center">
              <Row>
                <Column className="w-1/2 pr-2">
                  <Button
                    className="box-border block w-full rounded-[8px] bg-green-800 px-[20px] py-[12px] text-center font-semibold text-white"
                    href={`${process.env.NEXT_PUBLIC_HOSTNAME}/ingresso/${id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-ticket-icon lucide-ticket"
                    >
                      <path d="M2 9a3 3 0 010 6v2a2 2 0 002 2h16a2 2 0 002-2v-2a3 3 0 010-6V7a2 2 0 00-2-2H4a2 2 0 00-2 2zM13 5v2M13 17v2M13 11v2" />
                    </svg>
                    Seu ingresso
                  </Button>
                </Column>
                <Column className="w-1/2 pl-2">
                  <Button
                    className="box-border block w-full rounded-[8px] border border-solid border-gray-200 bg-white px-[20px] py-[12px] text-center font-semibold text-gray-900"
                    href={process.env.NEXT_PUBLIC_HOSTNAME}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar-days-icon lucide-calendar-days"
                    >
                      <path d="M8 2v4M16 2v4" />
                      <rect width={18} height={18} x={3} y={4} rx={2} />
                      <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                    </svg>
                    Programação do evento
                  </Button>
                </Column>
              </Row>
            </Column>
          </Row>

          <Text className="my-4 text-gray-700">
            Qualquer dúvida é só nos chamar em nosso Instagram:{" "}
            <Link
              href={`https://instagram.com/${appConfig.instagram}`}
              className="text-green-800"
            >
              @{appConfig.instagram}
            </Link>
          </Text>

          <Text className="text-gray-700">
            Agradecemos por sua participação e nos vemos em breve!
          </Text>
          <Hr className="my-6 border-t border-gray-300" />
          <Text className="text-xs text-gray-500">
            Atenciosamente,
            <br />
            Organização do {appConfig.shortTitle}
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
