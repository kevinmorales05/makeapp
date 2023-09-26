import getCurrentUser from "@/app/actions/getCurrentUser";
import { RELEVANCE, WOULD_RECOMMEND } from "@/app/components/modals/FeedbackModal";
import prisma from "@/app/libs/prismadb";
import { Feedback } from "@prisma/client";
import { NextResponse } from 'next/server';

type FeedbackBody = {
    relevance: RELEVANCE,
    comment: string,
    would_recommend: WOULD_RECOMMEND,
    email?: string,
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { relevance, comment, would_recommend, email }: FeedbackBody = body

        const currentUser = await getCurrentUser();
        const feedback = await prisma.feedback.create({
            data: {
                userId: currentUser?.id ? currentUser.id : null,
                relevance: relevance,
                comment: comment,
                wouldRecommend: would_recommend,
                email: email
            }
        })
        return NextResponse.json(feedback)
    } catch (e) {
        return NextResponse.error();
    }
}