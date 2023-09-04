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

import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['es', 'en', 'ko'],

//   // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
//   defaultLocale: 'es'
// });

// export const config = {
//   // Skip all paths that should not be internationalized. This example skips the
//   // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
//   matcher: ['/((?!api|_next|.*\\..*).*)']
// };


import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['es', 'en', 'ko'];
const publicPages = ['/*', '/shop', '/carts', "/shop/", "/favorites", "/listings"];

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
    // (req) => intlMiddleware(req),
    {
        callbacks: {
            authorized: ({ token }) => {
                return true;
                console.log("this token is: ", token, token != null)
                return token != null
            }
        },
        //   jwt: { decode: authOptions.jwt },
        // callbacks: {
        //     authorized: ({ token }) => !!token,
        // },
        pages: {
            signIn: '/'
        }
    }
);

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
        'i'
    );

    // Permitir que /shop/[shopId] sea pública si [shopId] es un número
    const shopIdRegex = /^\/shop\/\d+$/;

    const isPublicPage = shopIdRegex.test(req.nextUrl.pathname) || publicPathnameRegex.test(req.nextUrl.pathname);
    if (isPublicPage) {
        return intlMiddleware(req);
    } else {
        return (authMiddleware as any)(req);
    }
}

export const config = {
    matcher: [
        '/((?!api|_next|.*\\..*).*)'
        // '/((?!api|_next/static|_next/img|img|favicon.ico).*)',
    ]

};
// export const config = {
//     matcher: ["/((?!api/auth|_next|favicon.ico).*)"],
//   };