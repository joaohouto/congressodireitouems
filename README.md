# ⚖️ Congresso Jurídico da UEMS

Este é o site do Congresso Jurídico da UEMS, um evento acadêmico focado em palestras, debates e apresentações de trabalhos científicos na área do Direito em Aquidauana/MS.

## Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Framework:** [Next.js](https://nextjs.org/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Autenticação:** [Auth.js](https://authjs.dev/)
- **Banco de Dados:** [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
- **Envio de E-mails:** [Resend](https://resend.com/)
- **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)

## ⚡ Guia de Início Rápido

Siga estas instruções para configurar e rodar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [pnpm](https://pnpm.io/installation)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone https://github.com/joaohouto/congressojuridicouems.git
    cd congressojuridicouems
    ```

2.  Instale as dependências:
    ```bash
    pnpm install
    ```

### Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto e adicione as seguintes variáveis:

```env
# URL de conexão com o banco de dados MongoDB
DATABASE_URL="mongodb+srv://user:password@host/database"

# E-mails com permissão para acessar a área de gerência (separados por vírgula)
AUTH_WHITELIST="email1@example.com,email2@example.com"

# Chave da API do Resend para envio de e-mails
RESEND_API_KEY="re_xxxxxxxxxxxxxxxx"

# URL base da aplicação
NEXT_PUBLIC_HOSTNAME="http://localhost:3000" # ou https://congressodireitouems.com.br para produção
```

### Rodando a Aplicação

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para ver o resultado.

## Estrutura do Projeto

### `src/app/config.ts`

Este arquivo centraliza todas as informações estáticas do evento, como título, datas, cronograma, palestrantes e editais. Manter esses dados em um único local facilita a manutenção e atualização do site.

### Rotas da Aplicação

O projeto utiliza o App Router do Next.js. As principais rotas são:

- `/`: Página inicial com informações gerais sobre o evento.
- `/editais`: Exibe os editais e documentos do congresso, organizados por ano.
- `/ingresso`: Página onde os participantes podem gerar uma imagem de ingresso personalizada para compartilhar nas redes sociais.
- `/ingresso/[id]`: Exibe o ingresso gerado para um participante específico.
- `/gerencia`: Área administrativa para gerenciamento dos ingressos de participantes, protegida por autenticação.

### API

- `/api/ticket/create`: Esta rota `POST` cria um novo registro de ingresso. Ela recebe um nome de usuário do Instagram, busca o nome completo e a foto de perfil do usuário através da API do Instagram, e salva esses dados no banco de dados junto com um número de inscrição sequencial. (PS.: o URL de visualização da imagem expira, passado algum tempo, o ideal seria salvar a foto do usuário em um bucket)

- `/api/ticket?id={id}`: Esta rota `GET` gera a imagem do ingresso. Utilizando a biblioteca `next/og`, ela cria uma imagem a partir de componentes React, combinando os dados do participante (buscados pelo `id`) com um template de imagem (`/public/ingresso.jpg`).

- `/api/sponsors`: Esta rota `GET` retorna uma lista com os caminhos das imagens dos patrocinadores, lendo diretamente o conteúdo do diretório `/public/patrocinadores`.

## Deploy

Faça o deploy deste projeto na Vercel com um clique:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjoaohouto%2Fcongressojuridicouems)
