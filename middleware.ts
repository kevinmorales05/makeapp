import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ["en", "ko", "es"]
const defaultLocale = "es"
export default async function middleware(request: NextRequest) {
    const handleI18nRouting = createIntlMiddleware({
        locales,
        defaultLocale,
        localeDetection: false,
    });
    const response = handleI18nRouting(request);

    return response;
}

export const config = {
    // matcher: ['/((?!_next|.*\\..*).*)']
    matcher: ['/((?!api|_next|.*\\..*).*)']

};