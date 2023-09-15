import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const checkout = await prisma.checkout.create({
            data: {
                hasUser: currentUser !== null,
                userId: currentUser?.id,
                contact: body.contact,
                deliveryMethods: body.deliveryMethods,
                deliveryShip: body.deliveryShip,
                deliveryPickup: body.deliveryPickup,
                items: body.items
            }
        })

        return NextResponse.json(checkout)
    } catch (e) {
        return NextResponse.error();
    }
}