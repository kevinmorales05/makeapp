import React, { Suspense } from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
import {
    IListingsParamsShop
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from '../components/EmptyState'
import getProducts from '../actions/getProducts'
import { PRODUCTS_PEER_PAGE } from '../constants/constants'
import { formattedProducts } from '../hooks/useProducts'
// import { useTranslations } from 'next-intl'
import getCategories from '../actions/getCategories'
import { getTranslator } from 'next-intl/server'
import Loading from '../loading'
import { MoonLoader, PropagateLoader } from 'react-spinners'

interface ISearchParams {
    category: string;
    subCategory: string;
}

interface ShopProps {
    // searchParams: IListingsParamsShop
    searchParams: ISearchParams;
    locale: string;
};

export const dynamic = 'auto'


export default async function page(
    // { searchParams, locale }: ShopProps
    params:any

) {
    const { searchParams, locale } = params
    // const t = await getTranslator(locale, "categories")
    console.log("searchParams", searchParams, "all", params)
    const currentUser = await getCurrentUser();
    const products = await getProducts(PRODUCTS_PEER_PAGE, searchParams?.category, searchParams?.subCategory);
    // console.log("searchParams", searchParams, "params", params);
    // console.log("tranalator", t("title"));

    const categories = await getCategories(searchParams);
    // console.log("categories", categories)


    return (
        <ClientOnly>
            <Container>
                <div className='flex flex-wrap md:flex-nowrap justify-start'>
                    <div className='w-full md:w-[480px] xl:w-[232px]'>
                        <Suspense fallback={<PropagateLoader
                            size={100}
                            color="red"
                        />}>
                            <ShopAside categories={categories} />
                        </Suspense>
                    </div>
                    <div className='w-full md:w-auto xl:auto flex flex-col'>
                        <Suspense fallback={<MoonLoader
                            size={100}
                            color="red"
                        />}>
                            <ShopMain data={formattedProducts(products)} />
                        </Suspense>

                    </div>
                </div>
            </Container>
        </ClientOnly>
    )
}
