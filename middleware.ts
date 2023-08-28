// export { default } from "next-auth/middleware"

// export const config = { 
//   matcher: [
//     "/trips",
//     "/reservations",
//     "/properties",
//     "/favorites",
//     "/shop",
//     "/cart",
//   ]
// };

// import createMiddleware from 'next-intl/middleware';
 
// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'de'],
 
//   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//   defaultLocale: 'en'
// });
 
// export const config = {
//   // Skip all paths that should not be internationalized. This example skips the
//   // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
//   matcher: ['/((?!api|_next|.*\\..*).*)']
// };


import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
 
const locales = ['es','en', 'ko'];
const publicPages = ['/', '/login', '/shop', '/cart', "/shop/*", "/favorites", "/listings" ];
 
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'es'
});
 
const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: '/login'
    }
  }
);
 
export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
 
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};