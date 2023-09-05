'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts';
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import HeartButton from '../components/buttons/HeartButton';

import { motion } from "framer-motion"
import { PRODUCTS_PEER_PAGE } from '../constants/constants';
import Image from 'next/image';
import { SafeUser } from '../types';
import { useFavoriteStore } from '../hooks/useFavorite';
import { useRef } from 'react';


interface IShopProps {
  id: number;
  title: string
  description: string
  category: string
  subCategory: string
  cost: number
  promoCost: number
  bestSeller: boolean
  kit: boolean
  weight: string
  farmacState: string
  presentation: string
  color: string
  src: string
}
type ShopMainProps = {
  data: IShopProps[],
  currentUser?: SafeUser | null
}

export default function ShopMain(props: ShopMainProps) {
  const { data, currentUser } = props
  const { mergeLocalandDB, currentFavorites } = useFavoriteStore()

  const { getByPagination } = useProducts();
  const [products, setProducts] = useState<IShopProps[]>(getByPagination(0, PRODUCTS_PEER_PAGE, data));
  const locale = useLocale()
  const router = useRouter()

  const refMerge = React.useRef<number>(0);

  useEffect(() => {
    if (refMerge?.current === 0 && currentUser) {
      mergeLocalandDB(currentUser, currentFavorites(), locale)
      refMerge.current++;
    }
  }, [currentUser])




  useEffect(() => {
    setProducts(getByPagination(0, PRODUCTS_PEER_PAGE, data))
  }, [data])

  const handlePagination = (page: number) => {
    const from = (page - 1) * PRODUCTS_PEER_PAGE;
    const to = (page - 1) * PRODUCTS_PEER_PAGE + PRODUCTS_PEER_PAGE;
    const filteredProducts = getByPagination(from, to, data)
    setProducts(filteredProducts)
  }



  return (
    <>
      <div className='inline-grid grid-cols-3 gap-6 py-2 max-[480px]:grid-cols-1'>

        {products.length > 0 && products.map(p => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 0.9 }}

            className="max-w-sm rounded overflow-hidden shadow-lg bg-white relative group" key={p.title}
            onClick={() => router.push(`/shop/${p.id}`, { locale })}

          >
            <Image className='w-full' src={p.src} width={100} height={80} alt={p.src} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">{p.title}</div>
              <p className="text-gray-700 text-base text-center">
                $ {p.cost}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`#${p.subCategory}`}</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{p.cost < 20000 && "#best price"}</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{`#${p.color}`}</span>
            </div>
            <div
              className="
            absolute
            top-5
            right-5
          "
            >
              <HeartButton
                listing={p}
                currentUser={currentUser}
              />
            </div>
          </motion.div>

        ))}

      </div>

      <div className='flex justify-center items-center py-2' >
        {/* <Stack spacing={10}>
          <Pagination
            count={Math.ceil(getCount() / PAGESIZE)}
            onChange={handlePagination}
            color="secondary" />
        </Stack> */}

        <Pagination key={"lg"}
          initialPage={1} size='lg'
          total={Math.ceil(data.length / PRODUCTS_PEER_PAGE)}
          onChange={(number) => handlePagination(number)}
        />
      </div>
    </>
  )
}
