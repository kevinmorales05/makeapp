'use client'
import React, { Fragment } from 'react'
import HeadingAside from './HeadingAside'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import ClientOnly from '../components/ClientOnly'
import { Accordion, AccordionItem, cn } from '@nextui-org/react'
import Link from 'next/link'
import { useCategories } from '../hooks/useCategories'

interface IShopAsideProps {
  category: string,
  values: string[]
}
interface ICategoryByName {
  category: string,
  subCategory: string
}

export default function ShopAside({ allCategories, categoryByName }: {
  allCategories: IShopAsideProps[],
  categoryByName: ICategoryByName,
}) {
  const locale = useLocale()
  const t = useTranslations("categories")
  const tshop = useTranslations("shoppage")

  console.log("categories: ", allCategories)

  return (

    <div className='flex flex-col px-4 sm:px-0'>

      {/* {categories} */}
      <section className='py-1 mb-2'>
        <HeadingAside title={tshop("aside.categories", { locale })} />
        {/* <Accordion selectionMode="multiple" defaultExpandedKeys={[categoryByName.category]} >
            {allCategories.map((i) => (
              <AccordionItem key={i.category} aria-label={i.category} title={t(`${i.category}.label`)}>
                <ul>
                  {i.values.map((item: string, index: number) => (
                    <li key={item} className='py-2 px-8'>
                      <Link href={`${locale}/shop?category=${i.category}&subCategory=${item}`} color="foreground" className={cn(`hover:text-red-dark/50`,
                        categoryByName.subCategory === item ? "text-red-dark/50" : ""
                      )}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </Accordion> */}
      </section>

      {/* {slider} */}
      <section>
      </section>
      {/* tops */}
      <section>
        <HeadingAside title={tshop("aside.tops3", { locale })} />
        <div className="flex justify-center items-start flex-col px-1">
          {Array.from([1, 2, 3]).map(item => (
            <div key={item} className="flex justify-center align-center">
              <Image src="/img/product1.jpg" alt="image" width={60} height={100} className='cursor-pointer' />
              <div className="flex flex-col justify-center align-center">
                <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
                <span className="text-sm text-[#5e5c5c]">$30.99</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
