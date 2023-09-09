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
import { useCategories } from '../hooks/useCategories'

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
        limit: number,
        skip: number
    },
    // locale: string
}
) {

    const i18category =
        typeof searchParams.category === 'string' ? searchParams.category : "all"
    const i18subCategory =
        typeof searchParams.subCategory === 'string' ? searchParams.subCategory : ""
    const limit =
        typeof searchParams.limit === 'string' ? Number(searchParams.limit) : PRODUCTS_PEER_PAGE
    const skip_page =
        typeof searchParams.skip === 'string' ? Number(searchParams.skip) : 0


    const currentUser: SafeUser | null = await getCurrentUser();
    const products: SafeProducts[] = await getProducts(limit, skip_page, i18category, i18subCategory);

    // const categories = await getCategories();

    const { keysCategories } = useCategories()
    // console.log("all categories: ", categories)



    // const i18Categories = categories.map(c => ({
    //     ...c,
    //     i18Category: c.category.split(' ').join('-')
    // }))

    const categoryByName = { category: i18category, subCategory: i18subCategory }

    return (
        <Container>
            <Breadcrumbs />
            <div className='flex flex-wrap md:flex-nowrap justify-start'>
                <div className='w-full md:w-[480px] xl:w-[232px]'>
                    <ClientOnly>
                        <ShopAside keysCategories={keysCategories} categoryByName={categoryByName} />
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
