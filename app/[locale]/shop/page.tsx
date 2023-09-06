import React, { Suspense } from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
import getCurrentUser from "@/app/actions/getCurrentUser";
import getProducts from '../actions/getProducts'
import { PRODUCTS_PEER_PAGE } from '../constants/constants'
import { formattedProducts } from '../hooks/useProducts'
import getCategories from '../actions/getCategories'
import Breadcrumbs from '../components/Breadcrumbs'
import { SafeProducts, SafeUser } from '../types'

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
    const i18Categories = categories.map(c => ({
        ...c,
        i18Category: c.category.split(' ').join('-')
    }))

    const categoryByName = { category, subCategory }

    return (
        <Container>
            <Breadcrumbs />
            <div className='flex flex-wrap md:flex-nowrap justify-start'>
                <div className='w-full md:w-[480px] xl:w-[232px]'>
                    <ClientOnly>
                        <ShopAside allCategories={i18Categories} categoryByName={categoryByName} />
                    </ClientOnly>
                </div>
                <div className='w-full md:w-auto xl:auto flex flex-col'>
                    <Suspense fallback={"Loading..."}>
                        <ShopMain data={formattedProducts(products)} currentUser={currentUser} />
                    </Suspense>

                </div>
            </div>
        </Container>
    )
}
