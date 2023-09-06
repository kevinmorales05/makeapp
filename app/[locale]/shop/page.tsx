import React, { Suspense } from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from '../components/EmptyState'
import getProducts from '../actions/getProducts'
import { PRODUCTS_PEER_PAGE } from '../constants/constants'
import { IProductFormatted, formattedProducts } from '../hooks/useProducts'
import getCategories from '../actions/getCategories'
import Loading from '../loading'
import { MoonLoader, PropagateLoader } from 'react-spinners'
import { useLocale } from 'next-intl'
import { categoriesFormattedShop } from '../hooks/useFormatters'
import Breadcrumbs from '../components/Breadcrumbs'
import { SafeProducts, SafeUser } from '../types'

interface ISearchParams {
    category?: string;
    subCategory?: string;
}

export const dynamic = "force-dynamic";


export default async function ShopPage({
    searchParams,
    // locale
}: {
    searchParams: {
        // [key: string]: string |
        // string[] |
        // undefined
        category: string,
        subCategory: string,
        limit: number
    },
    // locale: string
}
) {

    const category =
        typeof searchParams.category === 'string' ? searchParams.category : "skin care"
    const subCategory =
        typeof searchParams.subCategory === 'string' ? searchParams.subCategory : "lotion"
    const limit =
        typeof searchParams.limit === 'string' ? Number(searchParams.limit) : PRODUCTS_PEER_PAGE


    const currentUser: SafeUser | null = await getCurrentUser();
    const products: SafeProducts[] = await getProducts(limit, category, subCategory);

    const categories = await getCategories();
    const categoryByName = { category, subCategory }

    // console.log("lcoale shop", locale)
    return (
        <Container>
            <div className='flex flex-wrap md:flex-nowrap justify-start'>
                <Breadcrumbs />
                <div className='w-full md:w-[480px] xl:w-[232px]'>
                    <ClientOnly>
                        <ShopAside allCategories={categories} categoryByName={categoryByName} />
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
