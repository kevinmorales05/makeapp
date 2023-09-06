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

import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['es', 'en', 'ko'];
const publicPages = ['/', '/shop', '/carts', "/shop/", "/favorites", "/listings"];

export const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'es'
});

const authMiddleware = withAuth(
    function middleware(req: any) {
        return intlMiddleware(req);
    },
    // (req) => intlMiddleware(req),
    {
        callbacks: {
            authorized: ({ token }) => {
                return true;
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
    // Skip all paths that should not be internationalized. This example skips the
    // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|_next|.*\\..*).*)']
};