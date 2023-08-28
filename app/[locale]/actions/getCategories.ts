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

export default async function getCategories(category: string, subCategory: string) {
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

    const readableCategories = Array.from(uniqueFileds["categories"]).reduce((acc: any, category: any) => {
      const values = Array.from(uniqueFileds[category])
      acc.push({ category: category, values: values });
      return acc;

    }, [])

    return readableCategories;
  } catch (error: any) {
    throw new Error(error);
  }
}
