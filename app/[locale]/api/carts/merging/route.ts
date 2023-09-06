import getCurrentUser from "@/app/actions/getCurrentUser";
import { IProductFormatted } from "@/app/hooks/useProducts";
import prisma from "@/app/libs/prismadb";
import { produce } from "immer";
import { NextResponse } from "next/server";

interface IParams {
    listingId?: string;
}

export async function PUT(request: Request) {
    try {

        const currentUser = await getCurrentUser();


        if (!currentUser) {
            return NextResponse.error();
        }

        const mergeToServer = await request.json();

        const toMerge = mergeToServer.map((merge: any) => {
            return {
                productId: merge.id,
                quantity: merge.quantity,
                userId: currentUser.id,
            }
        })

        const userUpdated = await prisma.cart.createMany({
            data: toMerge
        })

        

        const user = prisma.user.findUnique({
            where: {
                id: currentUser.id,
            },
            include: {
                carts: true
            }
        })

        return NextResponse.json(user.carts);
    } catch (e) {
        return NextResponse.error();
    }
}