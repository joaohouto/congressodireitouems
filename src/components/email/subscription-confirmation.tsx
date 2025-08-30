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
    <Tailwind>
      <Html>
        <Head />
        <Body className="flex items-center justify-center">
          <Container className="max-w-[600px] p-4">
            <Img
              src={`${process.env.NEXT_PUBLIC_HOSTNAME}/banner.png`}
              alt={appConfig.title}
              className="w-full rounded"
            />
            <Text className="mb-3 text-2xl">
              Olá, <b>{name}</b>!
            </Text>
            <Text>
              Estamos felizes em confirmar sua inscrição no III Congresso
              Jurídico do Curso de Direito da UEMS, que ocorrerá de 11 a 14 de
              novembro de 2024.
            </Text>
            <li>
              <b>Tema:</b> {appConfig.theme}
            </li>
            <li>
              <b>Local:</b> Unidade da UEMS Aquidauana Rodovia Graziela Maciel
              Barroso, Km 12 Zona Rural
            </li>

            <Text className="my-2 font-semibold">Seus dados</Text>

            <ul>
              <li>
                Nome: <b>{name}</b>
              </li>
              <li>
                Categoria: <b>{category}</b>
              </li>
            </ul>

            <Row>
              <Column align="center">
                <Row>
                  <td align="center" className="w-1/2 pr-[16px]" colSpan={1}>
                    <Button
                      className="box-border w-full rounded-[8px] bg-green-800 px-[20px] py-[12px] text-center font-semibold text-white"
                      href={process.env.NEXT_PUBLIC_HOSTNAME}
                    >
                      Programação do evento
                    </Button>
                  </td>
                  <td align="center" className="w-1/2 pl-[16px]" colSpan={1}>
                    <Button
                      className="box-border w-full rounded-[8px] border border-solid border-gray-200 bg-white px-[20px] py-[12px] text-center font-semibold text-gray-900"
                      href={`${process.env.NEXT_PUBLIC_HOSTNAME}/ingresso/${id}`}
                    >
                      Seu ingresso
                    </Button>
                  </td>
                </Row>
              </Column>
            </Row>

            <Text className="my-2">
              Qualquer dúvida é só nos chamar em nosso Instagram:{" "}
              <a href={`https://instagram.com/${appConfig.instagram}`}>
                @{appConfig.instagram}
              </a>
            </Text>

            <Text>
              Agradecemos por sua participação e nos vemos em breve!
              <br />
            </Text>
            <Hr />
            <Text>
              Atenciosamente,
              <br />
              Curso de Direito da UEMS Aquidauana
            </Text>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  </Html>
);
