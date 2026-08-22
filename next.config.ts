import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/anais",
        destination: "/encontro-cientifico",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
