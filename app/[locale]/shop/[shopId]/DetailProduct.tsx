
import Heading from '@/app/components/Heading'
import Button from '@/app/components/buttons/Button'

import { IProductFormatted } from '@/app/hooks/useProducts'
import React from 'react'
import { BsFillSquareFill } from 'react-icons/bs'
import CounterButton from './CounterButton'
import { LOCALES, getColorProduct } from '@/app/constants/client_constants'
import useCart from '@/app/hooks/useCart'
import { SafeUser } from '@/app/types'

type DetailProductProps = {
  handlerButton: (listing: IProductFormatted) => void,
  product: IProductFormatted,
  currentUser?: SafeUser | null
  locale: string
}

const DetailProduct = ({ handlerButton, product, currentUser, locale }: DetailProductProps) => {
  const { hasCarted } = useCart({ listing: product, currentUser, locale })
  return (
    <div className='flex flex-col gap-8'>
      <Heading
        title={product.title}
      />
      <div className='flex gap-4 items-baseline'>
        <p className='font-bold text-2xl'>{product.promoCost} $</p>
        <p className='line-through font-normal'>{product.cost}</p>
      </div>
      <Heading title={""} subtitle={product.description} />
      <div className='flex justify-between'>
        <div className="flex flex-col  justify-center items-start gap-4 font-semibold">
          <p className='flex gap-2'>Color: <span className="font-normal">{product.color}</span></p>
          <BsFillSquareFill className={getColorProduct(product.color)} />
        </div>
        <div className="flex flex-col  justify-center items-start gap-4 font-semibold">
          <p className='flex gap-2'>Category: <span className="font-normal">{product.category}</span></p>
          {/* <BsFillSquareFill className={getColorProduct(product.color)} /> */}
        </div>
      </div>
      <div className="flex flex-col gap-4 font-semibold">
        {/* <p>Quantity:</p>
        <CounterButton /> */}
        <Button label={hasCarted ? 'Added' : "Buy"} onClick={() => handlerButton(product)} />
      </div>
    </div>
  )
}

export default DetailProduct