import * as React from "react";
import { resend } from "@/lib/resend";
import { SubscriptionEmailTemplate } from "@/components/email/subscription-confirmation";
import { appConfig } from "@/app/config";

interface IConfirmation {
  id: string;
  email: string;
  name: string;
  category: string;
}

export async function sendSubscriptionConfirmation({
  id,
  email,
  name,
  category,
}: IConfirmation) {
  const { data, error } = await resend.emails.send({
    from: `${appConfig.shortTitle} <${appConfig.email}>`,
    to: email,
    subject: "Inscrição confirmada!",
    react: SubscriptionEmailTemplate({
      id,
      email,
      name,
      category,
    }) as React.ReactElement,
  });

  if (error) {
    console.log(error);
  }
}
