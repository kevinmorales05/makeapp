import getCurrentUser from "@/app/actions/getCurrentUser";
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

        const body = await request.json();

        const parserIds = body.map((b: string) => parseInt(b))

        const userUpdated = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                favoriteIds: parserIds
            }
        })

        const userFavoritesUser = await prisma.product.findMany({
            where: {
                id: {
                    in: userUpdated.favoriteIds,
                }
            }
        })

        return NextResponse.json(userFavoritesUser);
    } catch (e) {
        return NextResponse.error();
    }
}