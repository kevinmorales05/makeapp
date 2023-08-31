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
    const pathname = usePathname();
    const locale = useLocale();

    console.log("pathname: ", pathname)

    const { carts, currentUser } = props
    console.log("carts", carts, currentUser)

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Breadcrumbs/>

                <div className='block'>Already have an account? <span className='text-'>Login</span></div>
            </div>

        </div>
    )
}

export default CartDetails