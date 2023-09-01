'use client'

import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import Link from 'next-intl/dist/link'
import useLoginModal from '../hooks/useLoginModal'
import { IProductFormatted } from '../hooks/useProducts'
import { SafeUser } from '../types'
import Image from 'next/image'
import { IconHome } from './IconHome'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import TableCart from './TableCart'
import { AiOutlineShopping } from 'react-icons/ai'
import Heading from '../components/Heading'
import { Button } from '@nextui-org/react'
import ProductCarousel from '../components/carousel/ProductCarousel'

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
}

const CartDetails = (props: Props) => {
    const { carts, currentUser } = props
    const loginModal = useLoginModal()

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Breadcrumbs />
                {currentUser &&
                    <span className='block'>Already have an account?<Button onPress={() => loginModal.onOpen()} disableAnimation className='underline decoration-1 bg-transparent font-bold gap-1 p-0' endContent={<AiOutlineShopping className='font-bold text-base' />}>Login</Button></span>
                }
            </div>
            <Heading
                title="Cart"
                subtitle="List of products you shopping!"
                center
            />
            <TableCart data={carts} />
            <div className='relative w-full '>
                <ProductCarousel/>
            </div>
        </div >
    )
}

export default CartDetails