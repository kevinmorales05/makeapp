import React, { Suspense } from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from '../components/EmptyState'
import getProducts from '../actions/getProducts'
import { PRODUCTS_PEER_PAGE } from '../constants/constants'
import { IProductProps, formattedProducts } from '../hooks/useProducts'
import getCategories from '../actions/getCategories'
import { MoonLoader, PropagateLoader } from 'react-spinners'
import { categoriesFormattedShop } from '../hooks/useFormatters'
import Breadcrumbs from '../components/Breadcrumbs'

interface ISearchParams {
    category?: string;
    subCategory?: string;
}

interface ShopProps {
    searchParams: ISearchParams;
    locale: string;
};

export const dynamic = "force-dynamic";

const PEER_PAGE = PRODUCTS_PEER_PAGE

export default async function ShopPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const category =
        typeof searchParams.category === 'string' ? searchParams.category : 'skin-care'
    const subCategory =
        typeof searchParams.subCategory === 'string' ? searchParams.subCategory : 'toner'

    // const categoryWithoutDash = category.split('-').join(' ')
    // console.log("this", category)

    const productPagination: Omit<IProductProps, "createdAt" | "updatedAt">[] = await getProducts(PEER_PAGE, category, subCategory);
    const currentPagination = formattedProducts(productPagination)

    const sideCategories = await getCategories();

    const currentUser = await getCurrentUser();

    // const sideCategoriesWithDash = await getCategories();
    // const allCategories = categoriesFormattedShop(categories)

    const categoryChocen = { category, subCategory }

    return (
        <Container>
            <div className='flex flex-wrap md:flex-nowrap justify-start'>
                {/* <Breadcrumbs/> */}
                <div className='w-full md:w-[480px] xl:w-[232px]'>
                    <Suspense fallback={"Loading aside aside aside..."}>
                        <ShopAside allCategories={sideCategories} categoryByName={categoryChocen} />
                    </Suspense>
                </div>
                <div className='w-full md:w-auto xl:auto flex flex-col'>
                    <Suspense fallback={"Loading..."}>
                        <ShopMain data={currentPagination} currentUser={currentUser} />
                    </Suspense>

                </div>
            </div>
        </Container>
    )
}
