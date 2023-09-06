import prisma from "@/app/libs/prismadb";


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
    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
