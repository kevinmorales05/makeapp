/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  experimental: {
    appDir: true,
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
    ],
  },
  // i18n: {
  //   locales: ['en', 'ru', 'tm'],
  //   defaultLocale: 'en',
  //   localeDetection: false,
  //   // localePath: path.resolve('./public/locales'),
  //   // This is a list of locale domains and the default locale they
  //   // should handle (these are only required when setting up domain routing)
  //   // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
  //   domains: [
  //     {
  //       domain: "example.com",
  //       defaultLocale: "en-US",
  //     },
  //     {
  //       domain: "example.nl",
  //       defaultLocale: "nl-NL",
  //     },
  //     {
  //       domain: "example.fr",
  //       defaultLocale: "fr",
  //       // an optional http field can also be used to test
  //       // locale domains locally with http instead of https
  //       http: true,
  //     },
  //   ],
  // },
};

module.exports = withNextIntl(nextConfig);
// module.exports = nextConfig;
