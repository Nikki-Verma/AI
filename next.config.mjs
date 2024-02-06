/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
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
