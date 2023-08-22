import prisma from "@/app/libs/prismadb";

export interface IGetCategoriesProps {
  category?: string;
  subCategory?: string;
}

interface ICategory {
  category: string;
  subCategory: string;
}

export const dynamic = 'force-dynamic'

export default async function getCategories(params: IGetCategoriesProps) {
  try {
    // const {
    //   userId,
    //   roomCount,
    //   guestCount,
    //   bathroomCount,
    //   locationValue,
    //   startDate,
    //   endDate,
    //   category,
    // } = params;

    const { category, subCategory } = params;

    let query: any = {};

    if (category) {
      query.category = category;
    }
    if (subCategory) {
      query.subCategory = subCategory;
    }

    let listings;

    if (category) listings = await prisma.product.findMany({
      where: query,
      select: {
        id: true,
        category: true,
        subCategory: true
      }
      // orderBy: {
      //   createdAt: 'desc'
      // }
    })
    else listings = await prisma.product.findMany({
      select: {
        id: true,
        category: true,
        subCategory: true
      }
    });

    // const safeListings = listings.map((listing) => ({
    //   ...listing,
    //   createdAt: listing.createdAt.toISOString(),
    // }));

    // return safeListings;
    console.log("listings", listings);


    const uniqueFileds = listings?.reduce((acc: any, listing: ICategory) => {
      const CATEGORIES = "categories";
      const UNIQUE_CATEGORY = listing.category
      const EMPTY_SUBCATEGORY = ''

      if (listing.subCategory === EMPTY_SUBCATEGORY || listing.category.startsWith(listing.subCategory)) return acc;

      if (UNIQUE_CATEGORY in acc) {
        acc[UNIQUE_CATEGORY].add(listing.subCategory);
      } else {
        const cat = new Set();
        cat.add(listing.subCategory);
        acc[UNIQUE_CATEGORY] = cat;
      }

      if (CATEGORIES in acc) {
        let allCat = acc.categories
        allCat.add(listing.category);
        acc.categories = allCat;
      } else {
        let cats = new Set([listing.category]);
        acc[CATEGORIES] = cats;
      }

      return acc;
    }, {});
    console.log("uniques", uniqueFileds)
    return listings
  } catch (error: any) {
    throw new Error(error);
  }
}
