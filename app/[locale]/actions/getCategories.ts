import prisma from "@/app/libs/prismadb";

export interface UniqueFields {
  [key: string]: Set<string>;
}
export interface ReadableCategories {
  category: string;
  values: string[];
}


export default async function getCategories(): Promise<ReadableCategories[]> {
  try {
    const listings = await prisma.product.findMany({
      select: {
        id: true,
        category: true,
        subCategory: true
      }
    })

    const uniqueFileds = listings.reduce((acc: UniqueFields, listing) => {
      const CATEGORIES = "categories";
      const UNIQUE_CATEGORY = listing.category
      const EMPTY_SUBCATEGORY = ''

      if (listing.subCategory === EMPTY_SUBCATEGORY || listing.category.startsWith(listing.subCategory)) return acc;

      if (UNIQUE_CATEGORY in acc) {
        acc[UNIQUE_CATEGORY].add(listing.subCategory);
      } else {
        const cat = new Set<string>();
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

    const readableCategories = Array.from(uniqueFileds["categories"]).reduce((acc: ReadableCategories[], category) => {
      const values = Array.from(uniqueFileds[category])
      acc.push({ category: category, values: values });
      return acc;

    }, [])

    return readableCategories;
  } catch (error: any) {
    throw new Error(error);
  }
}
