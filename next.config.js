/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www-s.mlo.me' }
    ]
  }
};

module.exports = nextConfig;
