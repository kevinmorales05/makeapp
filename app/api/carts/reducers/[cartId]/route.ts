import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { produce } from "immer";
import { getPriceApp } from "@/app/constants/server_constants";
import { formattedCarts } from "@/app/hooks/useProducts";
import { SafeCart } from "@/app/types";

interface IParams {
    cartId: number;
}

enum ATOMIC_ACTION {
    PLUS = 'plus',
    SUBSTRACT = 'substract',
}

export async function PUT(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const { cartId } = params;
        const body = await request.json();
        const { atomic_action }: { atomic_action: string } = body

        const currentCartId = Number(cartId);


        if (!cartId || typeof cartId !== 'string') {
            throw new Error('Invalid ID');
        }

        let _request
        if (ATOMIC_ACTION.PLUS === atomic_action) {

             await prisma.cart.update({
                where: { userId: currentUser.id, productId: currentCartId },
                data: {
                    quantity: {
                        increment: 1
                    }
                }
            })
        }
        if (ATOMIC_ACTION.SUBSTRACT === atomic_action) {
            const findCart = await prisma.cart.findFirst({
                where: { userId: currentUser.id, productId: currentCartId },
            })

            if (findCart && findCart.quantity > 1) {
                _request = await prisma.cart.update({
                    where: { userId: currentUser.id, productId: currentCartId },
                    data: {
                        quantity: {
                            decrement: 1
                        }
                    }
                })
            }

        }

        const allCarts = await prisma.cart.findMany({
            where: { userId: currentUser.id },
            include: {
                product: true
            }
        })

        const safeCarts: SafeCart[] = allCarts.map((cart) => ({
            ...cart.product,
            quantity: cart.quantity,
            promoCost: getPriceApp(cart.product.promoCost),
            cost: getPriceApp(cart.product.cost),
        }));

        return NextResponse.json(safeCarts);
    } catch (e) {
        return NextResponse.error();
    }
}



