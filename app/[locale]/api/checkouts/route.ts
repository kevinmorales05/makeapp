import getCurrentUser from "@/app/actions/getCurrentUser";
import { ORDER_STATUS } from "@/app/constants/server_constants";
import { ICartItemState } from "@/app/hooks/useCart";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        console.dir(body)
        const { contact, deliveryMethods, deliveryShip, deliveryPickup, items } = body
        const orderNumber = uuidv4()
        const orderTotal = items.reduce((acc: number, item: ICartItemState) => acc + (item.promoCost * item.quantity), 0)


        const checkout = await prisma.checkout.create({
            data: {
                hasUser: currentUser !== null,
                userId: currentUser?.id,
                contact: contact,
                deliveryMethods: deliveryMethods,
                deliveryShip: deliveryShip,
                deliveryPickup: deliveryPickup,
                orderStatus: ORDER_STATUS.PENDING,
                orderNumber,
                orderTotal,

                items: items,
            }
        })

        return NextResponse.json(checkout)
    } catch (e) {
        return NextResponse.error();
    }
}