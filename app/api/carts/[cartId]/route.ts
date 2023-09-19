import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { produce } from "immer";
import { NextResponse } from 'next/server';

interface IParams {
    cartId: string;
}
// add
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

        const findCart = await prisma.cart.findUnique({
            where: {
                productId: parseInt(cartId),
                userId: currentUser.id
            }
        })

        let requesting;

        if (!findCart) {
            requesting = await prisma.cart.create({
                data: {
                    productId: parseInt(cartId),
                    userId: currentUser.id,
                    quantity: 1
                },
                include: {
                    product: true
                }
            })
        }

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
        return NextResponse.json(cartFormattedResponse, { status: 201 })
    } catch (e) {
        return NextResponse.error();
    }
}
// remove
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

        await prisma.cart.delete({
            where: {
                userId: currentUser.id,
                productId: parseInt(cartId)
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
