/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  transpilePackages: ["@repo/ui"],
};
