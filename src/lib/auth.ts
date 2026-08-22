import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { database } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { appConfig } from "@/config/app";

function getWhitelist(): string[] {
  return (process.env.AUTH_WHITELIST?.split(",") ?? [])
    .map((w) => w.toLowerCase().trim())
    .filter(Boolean);
}

const authSecret =
  process.env.NEXTAUTH_SECRET ||
  process.env.AUTH_SECRET ||
  (process.env.NODE_ENV === "production"
    ? undefined
    : "dev-only-secret-do-not-use-in-production");

if (!authSecret && process.env.NODE_ENV === "production") {
  console.error("CRITICAL: NEXTAUTH_SECRET ou AUTH_SECRET não configurado!");
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(database),
  secret: authSecret,
  providers: [
    EmailProvider({
      from: `${appConfig.shortTitle} <${appConfig.email}>`,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await resend.emails.send({
          from: appConfig.email,
          to: email,
          subject: `Seu link de acesso - ${appConfig.shortTitle}`,
          html: `<p>Olá!</p><p>Clique no link abaixo para entrar no painel:</p><p><a href="${url}">Entrar no sistema</a></p><p style="color:#666;font-size:12px">Ou copie o link: ${url}</p>`,
          text: `Olá!\n\nAcesse o link abaixo para entrar no painel:\n${url}\n`,
        });
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {
        // invalid URL format, fallback to baseUrl
      }
      return baseUrl;
    },
    async signIn({ user }) {
      const allowedEmails = getWhitelist();
      if (allowedEmails.length === 0) {
        console.warn("Tentativa de login negada: AUTH_WHITELIST não configurada.");
        return false;
      }
      const email = user.email?.toLowerCase().trim();
      if (!email) return false;
      return allowedEmails.includes(email);
    },
  },
};
