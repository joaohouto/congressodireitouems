"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      richColors
      theme="light"
      toastOptions={{}}
      {...props}
    />
  );
};

export { Toaster };
