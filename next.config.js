/*
  HOSTINGER DEPLOYMENT CHECKLIST:

  1. Push to GitHub
  2. On Hostinger: git pull && npm install && npm run build
  3. Start server: npm run start (or use PM2: pm2 start npm -- start)
  4. Point notrebeauvoyage.com DNS to Hostinger server IP
  5. Test OG image: visit https://www.notrebeauvoyage.com/opengraph-image
  6. Test WhatsApp preview using Facebook debugger:
     https://developers.facebook.com/tools/debug/
*/

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ["images.unsplash.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
