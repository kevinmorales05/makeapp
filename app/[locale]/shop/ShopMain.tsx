'use client'
import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
// import Pagination from './Pagination';
import { Pagination } from '@mui/material'
import { Products } from '../types/products';
import { useProducts } from '../hooks/useProducts';
import Image from 'next/image';


interface formattedProductsProps {
  id: number
  price: number
  title: string
  category: string
  src: string
}


const PAGESIZE = 6;


export default function ShopMain() {


  const { getByPagination, getCount } = useProducts();
  const [products, setProducts] = useState<formattedProductsProps[]>(getByPagination(0, PAGESIZE))

  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    const from = (page - 1) * PAGESIZE;
    const to = (page - 1) * PAGESIZE + PAGESIZE;
    const filteredProducts = getByPagination(from, to)
    setProducts(filteredProducts)
  }
  return (
    <>
      <div className='inline-grid grid-cols-3 gap-6 py-2 max-[480px]:grid-cols-1'>

        {products.map(p => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" key={p.title}>
            <Image className='w-full' src={p.src} width={100} height={100} alt={p.title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-center">{p.title}</div>
              <p className="text-gray-700 text-base text-center">
                $ {p.price}
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
        <Stack spacing={10}>
          <Pagination
            count={Math.ceil(getCount() / PAGESIZE)}
            onChange={handlePagination}
            color="secondary" />
        </Stack>
      </div>
    </>
  )
}
