import React from 'react'
import Container from '../components/Container'
import ClientOnly from '../components/ClientOnly'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'
export default function page() {
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
