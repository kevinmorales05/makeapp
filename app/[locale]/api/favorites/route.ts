import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { produce } from "immer";
import { NextResponse } from "next/server";



interface IParams {
    listingId?: string;
}


export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error();
        }

        const body = await request.json();
        const favoriteIds = body.map((item: string) => parseInt(item))
        const user = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                favoriteIds
            }
        })


        const userFavoritesChoice = await prisma.product.findMany({
            where: {
                id: {
                    in: user.favoriteIds,
                }
            }
        })
        return NextResponse.json(userFavoritesChoice);
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

        // const { listingId } = params;
        // if (!listingId || typeof listingId !== 'string') {
        //   throw new Error('Invalid ID');
        // }
        // let favoriteIds = [...(currentUser.favoriteIds || [])];
        // favoriteIds.push(listingId);

        const body = await request.json();

        const favoriteIds = produce([...(currentUser.favoriteIds || [])], draft => {
            draft.push(body.id)
        })

        const userUpdated = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                favoriteIds
            }
        })
        const userFavoritesChoice = await prisma.product.findMany({
            where: {
                id: {
                    in: userUpdated.favoriteIds,
                }
            }
        })
        return NextResponse.json(userFavoritesChoice);
    } catch (e) {
        return NextResponse.error();
    }
}