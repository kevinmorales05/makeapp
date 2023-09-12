'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { IProductFormatted, useProducts } from '../hooks/useProducts';
import { Card, CardBody, Chip, Pagination } from '@nextui-org/react';
import { useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import HeartButton from '../components/buttons/HeartButton';

import { motion } from "framer-motion"
import { PRODUCTS_PEER_PAGE } from '../constants/constants';
import Image from 'next/image';
import { SafeProducts, SafeUser } from '../types';
import { useFavoriteStore } from '../hooks/useFavorite';
import { useRef } from 'react';
import qs from 'query-string';
import { useSearchParams } from 'next/navigation';
import CartButton from '../components/buttons/CartButton';
import { useCategories } from '../hooks/useCategories';


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
  data: IProductFormatted[],
  currentUser?: SafeUser | null,
  params: {
    category: string,
    subCategory: string,
    limit: number,
    totalCount: number
  }
}

export default function ShopMain({ data, currentUser, params }: ShopMainProps) {

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
    console.log("page", page)
    const from = (page - 1) * params.limit;
    const to = (page - 1) * params.limit + params.limit;
    // const filteredProducts = getByPagination(from, to, data)
    // setProducts(filteredProducts)

    let currentQuery = {
      category: params.category,
      subCategory: params.subCategory,
      skip: from,
    }

    const url = qs.stringifyUrl({
      url: '/shop/',
      query: currentQuery
    }, { skipNull: true });

    router.push(url);
  }

  const { allCategories } = useCategories();


  console.log("data: ", data)
  return (
    <>
      {/* <div className='w-full inline-grid grid-cols-3 gap-6 py-2 max-[480px]:grid-cols-1'> */}
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
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
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {products.length > 0 && products.map(item => (
          <div className="flex flex-col col-span-1 gap-2 ">
            <div className="flex flex-col gap-2 w-full bg-transparent">
              <div className="overflow-visible p-0">

                <div className="flex flex-col gap-2 w-full">
                  <Card isPressable shadow="none" radius="none" className="aspect-square w-full relative overflow-hidden rounded-xl group">
                    <Image
                      fill
                      className="object-cover h-full w-full group-hover:scale-110 transition"
                      src={item.src}
                      alt="Listing"
                    />
                  </Card>
                  <div className="flex justify-start gap-3 items-center text-lg font-semibold">
                    $ {item.promoCost}
                    {item.cost && <div className="font-light line-through text-neutral-500">$ {item.cost}</div>}
                  </div>
                  <p className="font-semibold">{item.title}</p>
                  <p><Chip color="warning" variant="bordered">Bordered</Chip></p>
                  <Chip
                    startContent={<CheckIcon size={18} />}
                    variant="faded"
                    color="success"
                  >
                    Chip
                  </Chip>
                </div>
              </div>
            </div>
            <div >
              {/* <CartButton
              locale={locale}
              listing={item}
              currentUser={currentUser}
              key={item.id}
            /> */}
            </div>
          </div>
        ))}
      </div>


      <div className='flex justify-center items-center py-2' >
        <Pagination key={"lg"}
          initialPage={1} size='lg'
          total={Math.ceil(params.totalCount / PRODUCTS_PEER_PAGE)}
          onChange={(number) => handlePagination(number)}
        />
      </div>
    </>
  )
}
export const CheckIcon = ({
  size,
  height,
  width,
  ...props
}: any) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="currentColor" />
    </svg>
  );
};