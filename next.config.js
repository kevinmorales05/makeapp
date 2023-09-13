/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
    //   turbo: {
    //     loaders: {
    //       // Option format
    //       "*.md": [
    //         {
    //           loader: "@mdx-js/loader",
    //           options: {
    //             format: "md",
    //           },
    //         },
    //       ],
    //       // Option-less format
    //       "*.mdx": ["@mdx-js/loader"],
    //     },
    //   },
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "beshop-demo.vercel.app",
      "fakestoreapi.com",
      "d33wubrfki0l68.cloudfront.net",
      "firebasestorage.googleapis.com",
      "console.firebase.google.com",
      "healivemall.com",
      "healivemall-com.translate.goog",
      "i.ibb.co",
    ],
  },
};

module.exports = withNextIntl(nextConfig);
// module.exports = nextConfig;
