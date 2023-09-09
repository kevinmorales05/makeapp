import prisma from "@/app/libs/prismadb";

export default async function getProducts(
  page_peer_size: number,
  skip_page: number,
  i18category: string,
  i18subCategory: string,
) {
  try {

    let query: any = {};
    let products;

    if (i18category) {
      query.category = i18category.split('-').join(' ');
    }

    if (i18subCategory) {
      query.subCategory = i18subCategory.split('-').join(' ');
    }

    if (i18category !== "all") {
      products = await prisma.product.findMany({
        where: query,
        take: page_peer_size,
        skip: skip_page
      })
    } else {
      products = await prisma.product.findMany({
        take: page_peer_size,
        skip: skip_page
      })
    }

    return products;

  } catch (error: any) {
    throw new Error(error);
  }
}