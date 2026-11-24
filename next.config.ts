import path from "node:path";
import type { NextConfig } from "next";

// Security headers on every route: no framing by other sites (clickjacking),
// no MIME sniffing, and only the origin in the Referer sent to other sites.
const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  // This folder is the app, even with other lockfiles further up the disk.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
