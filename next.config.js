const path = require('path');
const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname);
    return config;
  },
};

module.exports = withMDX(nextConfig);
