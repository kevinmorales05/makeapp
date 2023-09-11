import prisma from "@/app/libs/prismadb";

export default async function getProducts(
  page_peer_size: number,
  skip_page: number,
  i18category: string,
  i18subCategory: string,
) {
  try {

    let query: any = {};
    let data;

    console.log("let me know", query, "other", page_peer_size, skip_page)


    if (i18category) {
      query.category = i18category
    }

    if (i18subCategory) {
      if (i18subCategory !== "ALL CATALOG") {
        query.subCategory = i18subCategory
      }
    }


    if (i18category !== "all") {
      console.log("here")
      data = await prisma.$transaction([
        prisma.product.findMany({
          where: query,
          take: page_peer_size,
          skip: skip_page
        }),
        prisma.product.count({ where: query }),
      ])

    } else {
      data = await prisma.$transaction([
        prisma.product.findMany({
          take: page_peer_size,
          skip: skip_page
        }),
        prisma.product.count()
      ])
    }

    const [categories, count] = data

    return {
      products: categories,
      pagination: {
        total: count
      },
    };

  } catch (error: any) {
    throw new Error(error);
  }
}