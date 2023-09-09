'use client'
import React, { Fragment } from 'react'
import HeadingAside from './HeadingAside'
import Image from 'next/image'
import { useLocale, useMessages, useTranslations } from 'next-intl'
import ClientOnly from '../components/ClientOnly'
import { Accordion, AccordionItem, cn } from '@nextui-org/react'
import Link from 'next/link'
import { CategoryKey, useCategories } from '../hooks/useCategories'

interface IShopAsideProps {
  category: string,
  i18Category: string,
  values: string[],
}
interface ICategoryByName {
  category: string,
  subCategory: string
}
type ShopAsideProps = {
  // allCategories: IShopAsideProps[],
  keysCategories: CategoryKey[],
  categoryByName: ICategoryByName,
}

export default function ShopAside({
  // allCategories,
  keysCategories,
  categoryByName }: ShopAsideProps) {
  const locale = useLocale()
  const t = useTranslations("categories")
  const tshop = useTranslations("shoppage")


  // const mappedSubcategories = t("skin-care.subs.mapped")
  // t.rich('skin-care.subs.mapped', {
  //   i: (chunks) => <>{console.log(chunks?.toLocaleString().split(' ').join('&'))}</>,
  // });


  const { keysCategories: someCategories } = useCategories()

  console.log("it workds", t("body-care.subs.helper", { sub: "" }))
  const ts = useTranslations("LocaleSwitcher")
  console.log("title", ts("title", { locale: "es" }))
  const tss = useTranslations("categories.body-care.subs")
  console.log("helper", tss("helper",  { locale: "cleanser" }))
  console.log("testing where is title", t("body-care.subs.title",  { locale: "es" }))


  const messages = useMessages();
  console.log("please tell me", messages)





  return (

    <div className='flex flex-col px-4 sm:px-0 whydevilmaycry'>

      {/* {categories} */}
      <section className='py-1 mb-2'>

        <ClientOnly>

          <HeadingAside title={tshop("aside.categories", { locale })} />
          <Accordion selectionMode="multiple" defaultExpandedKeys={[categoryByName.category]} >
            {someCategories.map((category) => (
              <AccordionItem key={category} aria-label={category} title={t(`${category}.label`)}>
                <ul>
                  {/* {category !== "all" && <div>tell me{t(`${category}.subs.mapper`)}</div>} */}
                  {
                    // t(`${category}.subs.mapper`)
                    true
                    &&
                    t.rich(`${category}.subs.mapper`, {
                      i: (chunks) => {
                        const subCategory = chunks?.toLocaleString().split('-').join(' ');
                        const format = t(`${category}.subs.helper`, { sub: chunks?.toLocaleString() })
                        console.log("format: ", format)
                        return (
                          <li key={chunks?.toLocaleString()} className='py-2 px-8'>
                            <Link href={`${locale}/shop?category=${category}&subCategory=${subCategory}`} color="foreground"
                              className={cn(`hover:text-red-dark/50`,
                                categoryByName.subCategory === subCategory ? "text-red-dark/50" : ""
                              )}>
                              {chunks?.toString()}--
                              {format}
                            </Link>
                          </li>)
                      }
                    })
                  }
                </ul>
              </AccordionItem>
            ))}
          </Accordion>
        </ClientOnly>

      </section>


      {/* <section className='py-1 mb-2'>

        <HeadingAside title={tshop("aside.categories", { locale })} />
        <Accordion selectionMode="multiple" defaultExpandedKeys={[categoryByName.category]} >
          {allCategories.reverse().map((c) => (
            <AccordionItem key={c.category} aria-label={c.category} title={t(`${c.i18Category}.label`)}>
              <ul>
                {c.values.map((item: string, index: number) => (
                  <li key={item} className='py-2 px-8'>
                    <Link href={`${locale}/shop?category=${c.category}&subCategory=${item}`} color="foreground" className={cn(`hover:text-red-dark/50`,
                      categoryByName.subCategory === item ? "text-red-dark/50" : ""
                    )}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
      </section> */}




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
