/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
      },
      {
        protocol: "https",
        hostname: "**.freepik.com",
      },
      {
        protocol: "https",
        hostname: "**.freepikcdn.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
