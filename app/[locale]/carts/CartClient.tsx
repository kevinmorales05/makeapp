'use client'

import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import useLoginModal from '../hooks/useLoginModal'
import { IProductFormatted, formattedProducts } from '../hooks/useProducts'
import { SafeUser } from '../types'
import { useLocale, useTranslations } from 'next-intl'
import TableCart from './TableCart'
import Heading from '../components/Heading'
import ProductCarousel from '../components/carousel/ProductCarousel'
import HasAccount from './HasAccount'
import { ICartItemState, useCartStore } from '../hooks/useCart'
import EmptyState from '../components/EmptyState'

type Props = {
    carts: ICartItemState[],
    currentUser: SafeUser | null,
    itemsCarousel: IProductFormatted[],
}

const CartClient = (props: Props) => {
    const { carts, currentUser, itemsCarousel } = props
    const loginModal = useLoginModal()
    const locale = useLocale()
    const t = useTranslations("cartpage")
    const { currentCarts, mergeLocalandDB } = useCartStore()
    const [data, setData] = useState<ICartItemState[]>([])

    useEffect(() => {
        mergeLocalandDB(currentUser, carts, locale)
    }, [currentUser, carts, locale])

    useEffect(() => {
        setData(currentCarts())
    }, [currentCarts()])

    console.log("data", data)
    console.log("but carts", carts)

    // if (!data) return (<>Loading...</>)

    return (
        <div>
            <div className='flex justify-between items-center'>
                <Breadcrumbs />
                {currentUser && <HasAccount onOpenModal={loginModal.onOpen} />}
            </div>
            {data.length === 0 ?
                <EmptyState
                    title="No carts found"
                    subtitle="Looks like you have no carts here."
                /> :
                <>
                    <Heading
                        title={t("title")}
                        subtitle={t("subtitle")}
                        center
                    />
                    <TableCart data={data} currentUser={currentUser} locale={locale} />
                </>
            }
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