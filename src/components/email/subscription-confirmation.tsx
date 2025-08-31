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
  Section,
  Link,
} from "@react-email/components";

import { appConfig } from "@/app/config";

interface EmailTemplateProps {
  id: string;
  email: string;
  name: string;
  category: string;
}

export const SubscriptionEmailTemplate: React.FC<
  Readonly<EmailTemplateProps>
> = ({ id, email, name, category }) => (
  <Html lang="pt-Br">
    <Head />
    <Tailwind>
      <Body className="mx-auto my-auto bg-gray-50 font-sans">
        <Container className="my-[40px] rounded p-8 shadow-sm">
          <Img
            src={`https://example.com/banner.png`}
            alt={appConfig.title}
            className="w-full rounded"
          />
          <Text className="mb-3 text-2xl font-bold text-gray-800">
            Olá, <b>{name}</b>!
          </Text>
          <Text className="text-gray-700">
            Estamos felizes em confirmar sua inscrição no III Congresso Jurídico
            do Curso de Direito da UEMS, que ocorrerá de 11 a 14 de novembro de
            2024.
          </Text>
          <ul className="list-disc pl-4 text-gray-700">
            <li>
              <b>Tema:</b> {appConfig.theme}
            </li>
            <li>
              <b>Local:</b> Unidade da UEMS Aquidauana Rodovia Graziela Maciel
              Barroso, Km 12 Zona Rural
            </li>
          </ul>

          <Text className="my-4 font-semibold text-gray-800">Seus dados</Text>
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
                    href={`https://example.com`}
                  >
                    Programação do evento
                  </Button>
                </Column>
                <Column className="w-1/2 pl-2">
                  <Button
                    className="box-border block w-full rounded-[8px] border border-solid border-gray-200 bg-white px-[20px] py-[12px] text-center font-semibold text-gray-900"
                    href={`https://example.com/ingresso/${id}`}
                  >
                    Seu ingresso
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
            Curso de Direito da UEMS Aquidauana
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
