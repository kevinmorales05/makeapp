import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { getPriceApp } from "../constants/server_constants";

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favoriteProducts = await prisma.product.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    });

    if (favoriteProducts) {
      const mappedFavoriteProducts = favoriteProducts.map((p) => ({
        ...p,
        promoCost: getPriceApp(p.promoCost),
        cost: getPriceApp(p.cost),
      }));
      return mappedFavoriteProducts;
    }
    else return [];

  } catch (error: any) {
    throw new Error(error);
  }
}
