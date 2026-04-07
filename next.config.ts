import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.storage.dev",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
      },
    ],
  },
};
export default withPayload(nextConfig);
