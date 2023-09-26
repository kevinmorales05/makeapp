
import Heading from '@/app/components/Heading'
import Button from '@/app/components/buttons/Button'

import { IProductFormatted } from '@/app/hooks/useProducts'
import React from 'react'
import { BsFillSquareFill } from 'react-icons/bs'
import {  getColorProduct } from '@/app/constants/client_constants'
import useCart from '@/app/hooks/useCart'
import { SafeUser } from '@/app/types'
import { useTranslations } from 'next-intl'
import { useCategories } from '@/app/hooks/useCategories'

type DetailProductProps = {
  handlerButton: (listing: IProductFormatted) => void,
  product: IProductFormatted,
  currentUser?: SafeUser | null
  locale: string
}

const DetailProduct = ({ handlerButton, product, currentUser, locale }: DetailProductProps) => {
  const { hasCarted } = useCart({ listing: product, currentUser, locale })
  const t = useTranslations()
  const { currentCategory } = useCategories()
  const category = product.category.split(' ').join('_')
  const _currentCategory = currentCategory(category)
  const IconCategory = _currentCategory[0].icon

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
          <p className='flex gap-2'>{t("shoppage_product.details.color")}:<span className="font-normal">{product.color !== 'null' && `${product.color}`}
          </span></p>
          <BsFillSquareFill className={getColorProduct(product.color)} />
        </div>
        <div className="flex flex-col  justify-center items-start gap-4 font-semibold">
          <p className='flex gap-2'>{t("shoppage_product.details.category")}:<span className="font-normal">{t(`categories.${_currentCategory[0].label}.label`)}</span></p>
          <IconCategory />
        </div>
      </div>
      <div className="flex flex-col gap-4 font-semibold">
        {/* <p>Quantity:</p>
        <CounterButton /> */}
        <Button label={hasCarted ?
          t("shoppage_product.details.sell_button", { state: "added" }) :
          t("shoppage_product.details.sell_button", { state: "buy" })
        } onClick={() => handlerButton(product)} />
      </div>
    </div>
  )
}

export default DetailProduct