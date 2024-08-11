import { vitePlugin as remix } from "@remix-run/dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    plugins: [remix()],
  },
};

export default nextConfig;
