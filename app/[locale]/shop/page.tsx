import React, { Suspense } from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from '../components/EmptyState'
import getProducts from '../actions/getProducts'
import { PRODUCTS_PEER_PAGE } from '../constants/constants'
import { formattedProducts } from '../hooks/useProducts'
import getCategories from '../actions/getCategories'
import Loading from '../loading'
import { MoonLoader, PropagateLoader } from 'react-spinners'
import { useLocale } from 'next-intl'
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


export default async function page(
    params: any
) {
    const { searchParams} = params
    const currentUser = await getCurrentUser();

    const products = await getProducts(PRODUCTS_PEER_PAGE, searchParams?.category?.split('-').join(' ') || "skin-care", searchParams?.subCategory);

    const categories = await getCategories("", "");
    const allCategories = categoriesFormattedShop(categories)

    const categoryByName = { category: searchParams.category, subCategory: searchParams?.subCategory || "" }

    // console.log("what is the product category", products, products.length)
    return (
        <Container>
            <div className='flex flex-wrap md:flex-nowrap justify-start'>
            <Breadcrumbs/>
                <div className='w-full md:w-[480px] xl:w-[232px]'>
                    <ClientOnly>
                        <ShopAside allCategories={allCategories} categoryByName={categoryByName} />
                    </ClientOnly>
                </div>
                <div className='w-full md:w-auto xl:auto flex flex-col'>
                    <ClientOnly>
                        <ShopMain data={formattedProducts(products)} currentUser={currentUser} />
                    </ClientOnly>

                </div>
            </div>
        </Container>
    )
}
