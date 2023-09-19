import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { produce } from "immer";

interface IParams {
    atomicNumber?: number;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const { atomicNumber } = params;

        if (!atomicNumber || typeof atomicNumber !== 'string') {
            throw new Error('Invalid ID');
        }


        const cartDeleted = await prisma.cart.delete({
            where: {
                userId: currentUser.id,
                productId: parseInt(atomicNumber)
            },
        })

        const allCarts = await prisma.cart.findMany({
            where: {
                userId: currentUser.id,
            },
            include: {
                product: true
            }
        })

        const cartFormattedResponse = allCarts.map(c => {
            return {
                ...c.product,
                quantity: c.quantity
            }
        })

        return NextResponse.json(cartFormattedResponse);
    } catch (e) {
        return NextResponse.error();
    }
}
