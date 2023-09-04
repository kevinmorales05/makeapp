import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


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

    const carouselItemsParser = carouselItems.map((items) => ({
      ...items,
      createdAt: items.createdAt.toString(),
      updatedAt: items.createdAt.toString(),
    }));
    return carouselItemsParser; 

    // return carouselItems;

  } catch (error: any) {
    throw new Error(error);
  }
}
