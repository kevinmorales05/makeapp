'use server'

import React from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
import getCurrentUser from "@/app/actions/getCurrentUser";
import getProducts from '../actions/getProducts'
import { PRODUCTS_PEER_PAGE } from '../constants/constants'
import { formattedProducts } from '../hooks/useProducts'
import Breadcrumbs from '../components/Breadcrumbs'
import { SafeProducts, SafeUser } from '../types'

// export const dynamic = "force-dynamic";

type ShopPageProps = {
    searchParams: {
        // [key: string]: string |
        // string[] |
        // undefined
        category: string,
        subCategory: string,
        limit: number,
        skip: number
    },
    params: { locale: string }
}

export default async function ShopPage({
    searchParams,
    params: { locale }
}: ShopPageProps

) {

    const i18category =
        typeof searchParams.category === 'string' ? searchParams.category : "all"
    const i18subCategory =
        typeof searchParams.subCategory === 'string' ? searchParams.subCategory : ""

    // typeof searchParams.limit === 'string' ? Number(searchParams.limit) :
    const limit = PRODUCTS_PEER_PAGE

    const skip_page =
        typeof searchParams.skip === 'string' ? Number(searchParams.skip) : 0


    const currentUser: SafeUser | null = await getCurrentUser();
    const { products, pagination: { total } } = await getProducts(limit, skip_page, i18category, i18subCategory);
    const _formattedProducts = formattedProducts(products)

    console.log("currentFormattedProducts", _formattedProducts.length, "total", total);

    const currentParams = { category: i18category, subCategory: i18subCategory, limit: limit, totalCount: total }

    return (
        <Container>
            {/* <Breadcrumbs /> */}
            <div className='flex flex-wrap md:flex-nowrap justify-start'>
                <div className='w-full md:w-[480px] xl:w-[600px] gap-4'>
                    <ClientOnly>
                        <ShopAside currentParams={currentParams} />
                    </ClientOnly>
                </div>
                <div className='w-full flex flex-col'>
                    <ClientOnly>
                        <ShopMain data={_formattedProducts} currentUser={currentUser} params={currentParams} />
                    </ClientOnly>
                </div>
            </div>
        </Container>
    )
}