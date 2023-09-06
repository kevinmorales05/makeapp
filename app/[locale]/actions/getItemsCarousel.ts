import prisma from "@/app/libs/prismadb";

export default async function getItemsCarousel(slides_count: number) {
  try {

    const max = 80;
    const skip = Math.floor(Math.random() * max);

    const carouselItems = await prisma.product.findMany({
      take: slides_count,
      skip: skip, // jump from 
      orderBy: {
        id: 'asc',
      },
    });
    return carouselItems
  } catch (error: any) {
    throw new Error(error);
  }
}
