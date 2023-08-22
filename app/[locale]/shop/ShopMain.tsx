'use client'
import React, { useState } from 'react'
// import Stack from '@mui/material/Stack';
// import Pagination from './Pagination';
// import { Pagination } from '@mui/material'
import { Products } from '../types/products';
import Image from 'next/image';
import { IProductProps, useProducts } from '../hooks/useProducts';
import { PRODUCTS_PEER_PAGE } from '../constants/constants';
import { Pagination } from '@nextui-org/react';


interface IShopProps {
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
export const dynamic = 'force-dynamic'

export default function ShopMain({ data }: {data: IShopProps[] }) {


  const { getByPagination } = useProducts();
  const [products, setProducts] = useState<IShopProps[]>(getByPagination(0, PRODUCTS_PEER_PAGE, data));

  const handlePagination = (page: number) => {
    const from = (page - 1) * PRODUCTS_PEER_PAGE;
    const to = (page - 1) * PRODUCTS_PEER_PAGE + PRODUCTS_PEER_PAGE;
    const filteredProducts = getByPagination(from, to, data)
    setProducts(filteredProducts)
  }
  return (
    <>
      <div className='inline-grid grid-cols-3 gap-6 py-2 max-[480px]:grid-cols-1'>

        {products.map(p => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" key={p.title} onClick={()=> alert(p.title)}>
            <Image className='w-full' src={p.src} width={100} height={100} alt={p.src} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">{p.title}</div>
              <p className="text-gray-700 text-base text-center">
                $ {p.cost}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#cosmetic</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#skin care</span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#solar skin</span>
            </div>
          </div>

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
        {Math.ceil(data.length / PRODUCTS_PEER_PAGE)}
      </div>
    </>
  )
}
