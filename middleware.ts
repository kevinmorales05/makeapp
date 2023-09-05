// import { chain } from '@/middlewares/chain'
// import { withMiddleware1 } from '@/middlewares/middleware1'
// import { withMiddleware2 } from '@/middlewares/middleware2'
// import i18AuthMiddleware from '@middlewares/i18middleware';

// export default chain([withMiddleware1, withMiddleware2, i18AuthMiddleware])

// // export const config = {
// //     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
// // ?

// export const config = {
//     matcher: [
//         "/en/",
//         "/es/",
//         "/",
//         "/trips",
//         "/reservations",
//         "/properties",
//         "/favorites",
//         "/shop",
//         "/:language(ko)/:shop*/",
//         "/:shop*",
//         "/cart",
//         "/api/poke",
//     ]
// };

import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['ko', 'es', 'en'],

    defaultLocale: 'es'
});

export const config = {
    // Skip all paths that should not be internationalized. This example skips the
    // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
    matcher: ['/((?!api|_next|.*\\..*).*)']
};