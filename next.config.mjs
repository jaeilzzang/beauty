import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "afsfroagcvtulsttshvc.supabase.co",
        protocol: "https",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "src/styles/_variables.scss"; @import "src/styles/_mixins.scss"; @import "src/styles/animation.scss";`,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
      {
        source: "/hospital/:id",
        missing: [
          {
            type: "query",
            key: "tab",
          },
        ],
        destination: "/hospital/:id?tab=info",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
