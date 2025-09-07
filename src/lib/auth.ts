import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { database } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { appConfig } from "@/app/config";

const whitelist = process.env.AUTH_WHITELIST?.split(",") ?? [];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(database),
  providers: [
    EmailProvider({
      from: `${appConfig.shortTitle} <${appConfig.email}>`,
      sendVerificationRequest: async ({ identifier: email, url }) => {
        await resend.emails.send({
          from: appConfig.email,
          to: email,
          subject: "Seu link de acesso",
          html: `<p>Clique aqui para entrar: ${url}`,
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
