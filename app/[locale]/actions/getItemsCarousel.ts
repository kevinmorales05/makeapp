import prisma from "@/app/libs/prismadb";
import { getPriceApp } from "../constants/server_constants";

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
    const mappedCarouselItems = carouselItems.map((p) => ({
      ...p,
      promoCost: getPriceApp(p.promoCost),
      cost: getPriceApp(p.cost),
    }));
    return mappedCarouselItems
  } catch (error: any) {
    throw new Error(error);
  }
}
