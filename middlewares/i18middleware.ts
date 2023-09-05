import createIntlMiddleware from 'next-intl/middleware';
import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import { authMiddleware } from './authmiddleware';
import middleware from '@ppmiddleware';

const locales = ['es', 'en', 'ko'];
const publicPages = ['/', '/shop', '/carts', "/shop/", "/favorites", "/listings"];

export const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'en'
});


export default function i18AuthMiddleware(middleware: NextMiddleware) {

    return async (request: NextRequest, event: NextFetchEvent) => {


        const publicPathnameRegex = RegExp(
            `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
            'i'
        );

        const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);

        if (isPublicPage) {
            return intlMiddleware(request);
        } else {
            return (authMiddleware as any)(request);
        }

        return middleware(request, event)
    }
}

// export const config = {
//     matcher: ['/((?!api|_next|.*\\..*).*)',
//         '/', '/shop', '/carts', "/shop/", "/favorites", "/listings"
//     ]
// };


// const publicPages = ['/', '/shop', '/carts', "/shop/", "/favorites", "/listings"];

// const intlMiddleware = createIntlMiddleware({
//     locales,
//     defaultLocale: 'es'
// });

// const authMiddleware = withAuth(
//     // function onSuccess(req) {
//     //     // return intlMiddleware(req.nextauth.token);
//     // },
//     (req:any) => intlMiddleware(req),        
//     {
//         callbacks: {
//             authorized: ({ token }) => {
//                 return true;
//                 return token != null
//             }
//         },
//         //   jwt: { decode: authOptions.jwt },
//         // callbacks: {
//         //     authorized: ({ token }) => !!token,
//         // },
//         pages: {
//             signIn: '/'
//         }
//     }
// );

// export default function middleware(req: NextRequest) {
//     const publicPathnameRegex = RegExp(
//         `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
//         'i'
//     );

//     // Permitir que /shop/[shopId] sea pública si [shopId] es un número
//     const shopIdRegex = /^\/shop\/\d+$/;

//     const isPublicPage = shopIdRegex.test(req.nextUrl.pathname) || publicPathnameRegex.test(req.nextUrl.pathname);
//     if (isPublicPage) {
//         return intlMiddleware(req);
//     } else {
//         return (authMiddleware as any)(req);
//     }
// }
