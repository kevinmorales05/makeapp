import React from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
import getListings, {
    IListingsParamsShop
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from '../components/EmptyState'



interface ShopProps {
    searchParams: IListingsParamsShop
};

export default async function page({ searchParams }: ShopProps) {

    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();


    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState showReset route="shop" />
            </ClientOnly>
        );
    }


    return (
        <ClientOnly>
            <Container>
                <div className='flex flex-wrap md:flex-nowrap justify-start'>
                    <div className='w-full md:w-[210px] xl:w-[232px]'>
                        <ShopAside />
                    </div>
                    <div className='w-full md:w-auto xl:auto flex flex-col'>
                        <ShopMain />
                    </div>

                </div>

            </Container>
        </ClientOnly>
    )
}
