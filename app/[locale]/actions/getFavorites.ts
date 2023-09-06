import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

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
      return favoriteProducts;
    }
    else return [];

  } catch (error: any) {
    throw new Error(error);
  }
}
