import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: number;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  // const currentUser = await getCurrentUser();

  // if (!currentUser) {
  //   return NextResponse.error();
  // }

  // const { listingId } = params;

  // if (!listingId || typeof listingId !== 'string') {
  //   throw new Error('Invalid ID');
  // }

  // let favoriteIds = [...(currentUser.favoriteIds || [])];

  // favoriteIds.push(listingId);

  // const user = await prisma.user.update({
  //   where: {
  //     id: currentUser.id
  //   },
  //   data: {
  //     favoriteIds
  //   }
  // });

  // return NextResponse.json(user);

  const body = await request.json();

  const seekingFavorites = await prisma.product.findMany({
    where: {
      id: {
        in: body
      }
    }
  })

  return NextResponse.json(seekingFavorites);

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

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
      throw new Error('Invalid ID');
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    favoriteIds = favoriteIds.filter((id) => id !== parseInt(listingId));


    const user = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        favoriteIds
      }
    });

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
