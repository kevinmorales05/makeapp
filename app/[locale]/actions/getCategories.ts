import prisma from "@/app/libs/prismadb";

export interface UniqueFields {
  [key: string]: Set<string>;
}
export interface ReadableCategories {
  category: string;
  values: string[];
}

/**
 * Function that I used to get all categories and subcategories from db but it's not really used anymore due to the
 * i18n integration is neccessary to have born data to allow translation
 * @param {number} radio - El radio del círculo.
 * @returns {Promise<ReadableCategories[]>} "An array of readable categories with their respective subcategories."
 * @throws {Error} error during the db
 * @example
 * const categoriasLegibles = await getCategories();
 */

export default async function getCategories(): Promise<ReadableCategories[]> {
  try {
    const listings = await prisma.product.findMany({
      select: {
        id: true,
        category: true,
        subCategory: true
      }
    })

    const CATEGORIES_PATH = "categories";

    const uniqueFields = listings.reduce((acc: UniqueFields, listing) => {
      const CATEGORY = listing.category;
      const SUBCATEGORY = listing.subCategory;
      const EMPTY_SUBCATEGORY = ''

      // Set "categories" to store unique categories
      if (CATEGORIES_PATH in acc) {
        const allCategories = acc.categories
        allCategories.add(CATEGORY);
        acc.categories = allCategories;
      } else {
        const cats = new Set<string>([CATEGORY]);
        acc[CATEGORIES_PATH] = cats;
      }

      // Set subcategories 
      if (SUBCATEGORY === EMPTY_SUBCATEGORY || CATEGORY.startsWith(SUBCATEGORY)) return acc;

      if (CATEGORY in acc) {
        acc[CATEGORY].add(SUBCATEGORY);
      } else {
        const category = new Set<string>();
        category.add(SUBCATEGORY);
        acc[CATEGORY] = category;
      }

      return acc;
    }, {});

    const readableCategories: ReadableCategories[] = Array.from(uniqueFields[CATEGORIES_PATH]).reduce((acc: ReadableCategories[], category) => {
      const CATEGORY = category

      if (!(CATEGORY in uniqueFields)) {
        const values: string[] = ['']
        acc.push({
          category: CATEGORY,
          values: values
        })
      }
      if (CATEGORY in uniqueFields) {
        const values = Array.from(uniqueFields[CATEGORY])
        acc.push({
          category: CATEGORY,
          values: values
        });
      }
      return acc
    }, [])

    return readableCategories;
  } catch (error: any) {
    throw new Error(error);
  }
}
