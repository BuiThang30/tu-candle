import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "unbearably-unarboured-mayme.ngrok-free.dev",
  ],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://open.spotify.com https://www.youtube.com https://www.youtube-nocookie.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;