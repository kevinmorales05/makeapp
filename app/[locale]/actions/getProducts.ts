import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export interface IListingsParamsShop {
  category?: string;
  nameProduct?: string;
}

export const dynamic = 'force-dynamic'

export default async function getProducts(
  // params: IListingsParams
  page_peer_size: number,
  category?: string,
  subCategory?: string,
) {
  try {
    // const {
    //   userId,
    //   roomCount,
    //   guestCount,
    //   bathroomCount,
    //   locationValue,
    //   startDate,
    //   endDate,
    //   category,
    // } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }
    if (subCategory) {
      query.subCategory = subCategory;
    }

    let listings;

    if (category) listings = await prisma.product.findMany({
      where: query,
      // orderBy: {
      //   createdAt: 'desc'
      // }
    })
    else listings = await prisma.product.findMany();

    // const safeListings = listings.map((listing) => ({
    //   ...listing,
    //   createdAt: listing.createdAt.toISOString(),
    // }));

    // return safeListings;
    return listings
  } catch (error: any) {
    throw new Error(error);
  }
}
