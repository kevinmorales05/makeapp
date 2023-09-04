'use client'

import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import Link from 'next-intl/dist/link'
import useLoginModal from '../hooks/useLoginModal'
import { IProductFormatted, formattedProducts } from '../hooks/useProducts'
import { SafeUser } from '../types'
import Image from 'next/image'
import { IconHome } from '../components/IconHome'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import TableCart from './TableCart'
import { AiOutlineShopping } from 'react-icons/ai'
import Heading from '../components/Heading'
import { Button } from '@nextui-org/react'
import ProductCarousel from '../components/carousel/ProductCarousel'
import HasAccount from './HasAccount'

export interface ICart {
    quantity: number;
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    cost: number;
    promoCost: number;
    bestSeller: boolean;
    kit: boolean;
    weight: string;
    farmacState: string;
    presentation: string;
    category: string;
    subCategory: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

type Props = {
    carts: ICart[],
    currentUser: SafeUser | null,
    itemsCarousel: IProductFormatted[],

}

const CartClient = (props: Props) => {
    const { carts, currentUser, itemsCarousel } = props
    const loginModal = useLoginModal()

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Breadcrumbs />
                {currentUser && <HasAccount onOpenModal={loginModal.onOpen} />}
            </div>
            <Heading
                title="Cart"
                subtitle="List of products you shopping!"
                center
            />
            <TableCart data={carts} />
            <div className='relative w-full '>
                <ProductCarousel
                    title='recommended'
                    dots
                    autoPlayProp
                    items={itemsCarousel}
                    currentUser={currentUser}
                />
            </div>
        </div >
    )
}

export default CartClient