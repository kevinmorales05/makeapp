import React from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
import  {
    IListingsParamsShop
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from '../components/EmptyState'



interface ShopProps {
    searchParams: IListingsParamsShop
};

export default async function page({ searchParams }: ShopProps) {
    const currentUser = await getCurrentUser();
    return (
        <ClientOnly>
            <Container>
                <div className='flex flex-wrap md:flex-nowrap justify-start'>
                    <div className='w-full md:w-[480px] xl:w-[232px]'>
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
