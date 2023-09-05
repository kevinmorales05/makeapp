'use client'

import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import Link from 'next-intl/dist/link'
import useLoginModal from '../hooks/useLoginModal'
import { IProductFormatted, formattedProducts } from '../hooks/useProducts'
import { SafeUser } from '../types'
import { useLocale } from 'next-intl'
import TableCart from './TableCart'
import Heading from '../components/Heading'
import ProductCarousel from '../components/carousel/ProductCarousel'
import HasAccount from './HasAccount'
import { ICartItemState, useCartStore } from '../hooks/useCart'

type Props = {
    carts: ICartItemState[],
    currentUser: SafeUser | null,
    itemsCarousel: IProductFormatted[],
}

const CartClient = (props: Props) => {
    const { carts, currentUser, itemsCarousel } = props
    const loginModal = useLoginModal()
    const locale = useLocale()
    const { currentCarts, mergeLocalandDB } = useCartStore()
    const [data, setData] = useState<ICartItemState[]>([])
    useEffect(() => {
        mergeLocalandDB(currentUser, carts, locale)
    }, [currentUser, carts, locale])

    useEffect(() => {
        setData(currentCarts())
    }, [currentCarts()])


    if (!data) return (<>Loading...</>)

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
            <TableCart data={data} currentUser={currentUser} locale={locale} />
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