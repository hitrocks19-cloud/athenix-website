/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Hides the dev-only "N" indicator button. Never shows in production
  // builds regardless of this setting — this only affects `next dev`.
  devIndicators: false,
};

export default nextConfig;
