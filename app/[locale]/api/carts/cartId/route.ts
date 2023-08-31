import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { produce } from "immer";

interface IParams {
    cartId?: number;
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

        const { cartId } = params;

        if (!cartId || typeof cartId !== 'string') {
            throw new Error('Invalid ID');
        }


        const findCart = prisma.cart.findUnique({
            where: {
                userId: currentUser.id,
                productId: cartId
            },
            include: {
                product: true,
            }
        })

        console.log(findCart)

        // const reduceQuantity = produce(findCart, draft => {
        //     draft.quantity = Math.max(draft.quantity - 1, 0)
        // })

        // if (reduceQuantity.quantity === 0) {
        //     const removeCart = prisma.cart.delete({
        //         where: {
        //             userId: currentUser.id,
        //             productId: cartId
        //         }
        //     })
        // }


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
