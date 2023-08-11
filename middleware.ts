// export { default } from "next-auth/middleware"

// export const config = { 
//   matcher: [
//     "/trips",
//     "/reservations",
//     "/properties",
//     "/favorites",
//     "/carousel"
//   ]
// };


import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es', 'ko'],
 
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'es'
});
 
export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};