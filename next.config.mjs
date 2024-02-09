import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "styles")],
    prependData: `@import "variable.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_ASSET_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_ASSET_HOSTNAME,
        port: process.env.NEXT_PUBLIC_ASSET_PORT,
      },
    ],
  },
};

export default nextConfig;
