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


const pageSize = 6;


export default function ShopMain() {


  const { getByPagination, getCount } = useProducts();
  const [products, setProducts] = useState<formattedProductsProps[]>(getByPagination(0, pageSize))

  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    const filteredProducts = getByPagination(from, to)
    setProducts(filteredProducts)
  }
  console.log(getCount, "getbout")
  return (
    <div>

      {products.map(p => (<div className="flex items-center justify-center" key={p.title}>
        <Image src={p.src} width={100} height={100} alt={p.title} />
        <p>{p.title}</p>
        <p>{p.price}</p>
      </div>))}

      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(getCount() / pageSize)}
          onChange={handlePagination}
          color="secondary" />
      </Stack>
    </div>
  )
}
