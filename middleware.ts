import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ["en", "ko", "es"]
const defaultLocale = "es"
const publicPages = [
    '/',
    '/favorites',
    '/carts',
    '/shop',
    '/shop/shopId',
    '/orders',
    // (/invoices requires auth)
];
const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    localeDetection: false,
});
const authMiddleware = withAuth(
    // Note that this callback is only invoked if
    // the `authorized` callback has returned `true`
    // and not for pages listed in `pages`.
    (req) => handleI18nRouting(req),
    {
        callbacks: {
            authorized: ({ token }) => {
                // console.log("gimme", token)
                return token != null
            }
        },
        pages: {
            signIn: '/'
        }
    }
);
export default async function middleware(request: NextRequest) {

    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
        'i'
    );
    const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname);


    if (isPublicPage) {
        const response = handleI18nRouting(request);
        return response
    } else {
        const response = (authMiddleware as any)(request);
        return response
    }
}

export const config = {
    // matcher: ['/((?!_next|.*\\..*).*)']
    matcher: ['/((?!api|_next|.*\\..*).*)']
};