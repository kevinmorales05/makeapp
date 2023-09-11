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

      query.category = i18category
    }

    if (i18subCategory) {
      const sub = "body lotion/ cream"
      query.subCategory = `${i18subCategory}`

      const su: string = query.subCategory
      console.log("let me know", query, "other", page_peer_size, skip_page)
      console.log("catch strig", query.subCategory === sub)
      console.log("catch 2 string", query.subCategory.split('/').join('/') === "body lotion/cream", JSON.stringify(query.subCategory.split('/')))
    }

    // console.log(query.subCategory.map((s: string) => s) === "body lotion/cream")

    if (i18category !== "all") {
      console.log("here")
      products = await prisma.product.findMany({
        where: query

        // take: page_peer_size,
        // skip: skip_page
      })
    } else {
      products = await prisma.product.findMany({
        // take: page_peer_size,
        // skip: skip_page
      })
    }

    return products;

  } catch (error: any) {
    throw new Error(error);
  }
}