import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { produce } from "immer";
import { NextResponse } from 'next/server';

interface IParams {
    // id?: string;
    params?: {
        locale?: string;
    }

}

export async function POST(request: Request, props: IParams) {
    try {
        const body = await request.json();
        const { data } = body

        return NextResponse.json({}, { status: 201 });
    } catch (e) {
        return NextResponse.error();
    }
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

        const bodyItem = await request.json();
        // console.log(bodyItem);

        const findCart = await prisma.cart.findUnique({
            where: {
                productId: bodyItem.id,
                userId: currentUser.id
            }
        })

        let requesting;

        if (!findCart) {
            requesting = await prisma.cart.create({
                data: {
                    productId: bodyItem.id,
                    userId: currentUser.id,
                    quantity: 1
                },
                include: {
                    product: true
                }
            })

            // return NextResponse.json({
            //     ...requesting.product,
            //     quantity: requesting.quantity
            // })

        }


        if (findCart) {
            requesting = await prisma.cart.update({
                where: {
                    productId: bodyItem.id,
                    userId: currentUser.id
                },
                data: {
                    quantity: findCart.quantity + 1
                },
                include: {
                    product: true
                }
            })

            // return NextResponse.json({
            //     ...requesting.product,
            //     quantity: requesting.quantity
            // })

        }
        // console.log(requesting)

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