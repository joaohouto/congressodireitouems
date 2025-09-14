import { useEffect, useState } from "react";
import axios from "axios";

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
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo: any, key: any) => (
                  <div className="flex h-14 w-24 items-center justify-center p-1">
                    <img
                      key={key}
                      src={logo}
                      className="max-h-full max-w-full object-contain grayscale hover:grayscale-0 transition-all"
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
