![Congresso Jurídico](/public/og.png)

# ⚖️ Congresso Jurídico da UEMS

Este é o repositório oficial do site do **Congresso Jurídico da UEMS - Aquidauana**, um evento acadêmico voltado a palestras, debates, apresentação de trabalhos científicos e integração na área do Direito.

---

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, Serverless Functions)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Banco de Dados:** [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Autenticação:** [NextAuth.js](https://next-auth.js.org/) (Passwordless Magic Link com whitelist de administradores)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animações:** [Motion](https://motion.dev/)
- **Envio de E-mails:** [Resend](https://resend.com/) com [@react-email/components](https://react.email/)
- **Geração de Imagens:** `@vercel/og` / `next/og`
- **Planilhas:** [xlsx](https://sheetjs.com/) (Exportação CSV e Excel)
- **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/)

---

## ⚡ Guia de Início Rápido

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [pnpm](https://pnpm.io/installation) (versão 10 ou superior)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/joaohouto/congressodireitouems.git
   cd congressojuridicouems
   ```

2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Gere o cliente do Prisma:
   ```bash
   pnpm prisma generate
   ```

### Variáveis de Ambiente

Crie um arquivo `.env` (ou `.env.local`) na raiz do projeto com base no `.env.example`:

```env
# URL base da aplicação
NEXT_PUBLIC_HOSTNAME="http://localhost:3000"

# URL de conexão com o banco de dados MongoDB Atlas
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/dbname?retryWrites=true&w=majority"

# Chave secreta de criptografia para autenticação (NextAuth)
AUTH_SECRET="uma-chave-secreta-forte-e-aleatoria"
NEXTAUTH_SECRET="uma-chave-secreta-forte-e-aleatoria"
NEXTAUTH_URL="http://localhost:3000"

# Chave da API do Resend para envio do Magic Link e confirmações
AUTH_RESEND_KEY="re_xxxxxxxxxxxxxxxx"

# E-mails autorizados para acesso ao painel de gerência (separados por vírgula)
AUTH_WHITELIST="admin@uems.br,organizador@uems.br"
```

### Executando Localmente

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📂 Estrutura de Pastas e Configurações

### `src/config/`
Centraliza todos os dados e configurações do evento para facilitar a edição anual:
- **`app.ts`**: Título, tema, datas, status das inscrições, links de formulários e cronograma de palestras (`EVENT_SCHEDULE`).
- **`edicts.ts`**: Editais oficiais de abertura, anexos e modelos de submissão organizados por ano.
- **`annals.ts`**: Anais e trabalhos científicos publicados por edição.
- **`galleries.ts`**: Álbuns e links das galerias de fotos de edições anteriores.

### Páginas e Rotas da Aplicação (`src/app/`)
- `/`: Página principal com banner hero, contagem regressiva, programação interativa, modais de palestrantes e atalho para inscrição.
- `/editais`: Lista de editais, retificações e modelos de documentos por ano.
- `/encontro-cientifico`: Submissão de trabalhos, cronograma de apresentações e anais.
- `/galeria`: Galeria de fotos oficiais do congresso.
- `/ingresso`: Formulário para retirar ingresso personalizado via usuário público do Instagram.
- `/ingresso/[id]`: Visualização, download e compartilhamento em alta resolução do ingresso gerado.
- `/gerencia`: Painel administrativo protegido por autenticação (Magic Link) para listar, editar, deletar e exportar (CSV/Excel) os ingressos.
- `/patrocinadores`: Painel rotativo em tela cheia com logos dos patrocinadores e detector de evento ao vivo (`LiveEvent`).

### Endpoints da API (`src/app/api/`)
- `POST /api/ticket/create`: Coleta dados públicos do Instagram, converte o avatar em Base64 permanente e armazena o ingresso no banco com rate limiting por IP.
- `GET /api/ticket?id={id}`: Gera dinamicamente a imagem do ingresso em 1080x1920 utilizando `next/og` e fontes personalizadas.
- `PUT /api/ticket/[id]` & `DELETE /api/ticket/[id]`: Atualização e exclusão de ingressos (requer autenticação admin).
- `DELETE /api/ticket/delete-all`: Exclusão em massa de ingressos (requer autenticação admin).
- `GET /api/schedule.ics`: Exportação da grade completa de eventos no formato iCalendar (.ics) para sincronização com Google Calendar / Apple Calendar.
- `GET /api/gallery`: Retorna a lista de imagens disponíveis na pasta pública de fotos.
- `GET /api/sponsors`: Retorna a lista de logotipos dos patrocinadores.
- `/api/auth/[...nextauth]`: Autenticação e sessão com NextAuth.js.

---

## 🔒 Segurança e Boas Práticas

- **Controle de Acesso *Deny-by-Default*:** Usuários que não estejam explicitamente declarados em `AUTH_WHITELIST` são impedidos de fazer login na área de gerência.
- **Rate Limiting & Proteção de Memória:** Limite de geração de ingressos por IP e limpeza periódica de caches voláteis para evitar vazamento de memória.
- **Sanitização e Validação Estrita:** Validação de ObjectIds do MongoDB e filtragem de caracteres para usernames do Instagram.
- **Isolamento de Avatares:** Download de imagens externas limitado a 5MB com validação de esquema HTTP/HTTPS para mitigação de riscos de SSRF e DoS.

---

## 📦 Build e Deploy

Para verificar tipagem e compilar o projeto para produção:

```bash
pnpm lint
pnpm build
```

O projeto está otimizado para deploy na **[Vercel](https://vercel.com/)**:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjoaohouto%2Fcongressojuridicouems)

