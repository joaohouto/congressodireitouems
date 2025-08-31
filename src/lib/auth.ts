import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { database } from "@/lib/prisma";
import { resend } from "@/lib/resend";

const whitelist = process.env.AUTH_WHITELIST?.split(",") ?? [];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(database),
  providers: [
    EmailProvider({
      server: "",
      from: "naoresponda@congressojuridicouems.com.br",
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await resend.emails.send({
          from: "naoresponda@congressojuridicouems.com.br",
          to: email,
          subject: "Seu link de acesso para o Congresso Jurídico",
          html: `<p>Clique <a href="${url}">aqui</a> para entrar.</p>`,
        });
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (whitelist.length === 0) {
        return true;
      }
      const email = user.email as string;
      if (whitelist.includes(email)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
