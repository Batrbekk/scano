/**
 * @type {import('next').NextConfig}
 */
const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ['static.vecteezy.com'],
  },
  //pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'], //for custom page extensions
};
