import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export const SponsorsBar = () => {
  const [logos, setLogos] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/sponsors");
        setLogos(response.data.files);
      } catch (error) {
        console.error("Erro ao buscar logos:", error);
      }
    })();
  }, []);

  if (!logos) return <div className="h-14 py-12 px-4 w-full" />;

  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((i, idx) => (
              <div
                key={idx}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo: any, key: any) => (
                  <div
                    key={key}
                    className="flex h-14 w-24 items-center justify-center p-1"
                  >
                    <Image
                      src={logo}
                      height={96}
                      width={96}
                      className="max-h-full max-w-full object-contain grayscale"
                      alt={`${logo}`}
                    />
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
