import prisma from "@/app/libs/prismadb";
import { getPriceApp } from "../constants/server_constants";


export default async function getProductById(
  productId: string
) {
  try {

    const id = parseInt(productId) ? parseInt(productId) : -1;

    if (id < 0) return null;

    const listing = await prisma.product.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageSrc: true,
        cost: true,
        promoCost: true,
        bestSeller: true,
        kit: true,
        weight: true,
        farmacState: true,
        presentation: true,
        category: true,
        subCategory: true,
        color: true,
        createdAt: true,
        updatedAt: true,
      }
      // include: {
      //   user: true
      // }
    });

    if (!listing) {
      return null;
    }

    const mappedListing = {
      ...listing,
      promoCost: getPriceApp(listing.promoCost),
      cost: getPriceApp(listing.cost),
    }

    return mappedListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
