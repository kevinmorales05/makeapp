import { withAuth } from 'next-auth/middleware';
import { intlMiddleware } from './i18middleware';
import { NextRequest } from 'next/server';

export const authMiddleware = withAuth(
    function middleware(req) {
        // return intlMiddleware(req);
        console.log(req.nextauth.token)
    },
    {
        callbacks: {
            authorized: ({ token }) => token != null
        },
        pages: {
            signIn: '/login'
        }
    }
);