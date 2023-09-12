'use client'

import {
  GiCeremonialMask,
  GiDelicatePerfume,
  GiHealthPotion,
  GiLips,
  GiPerfumeBottle,
  GiStarFormation,
} from 'react-icons/gi';
import { BsEmojiSunglasses, BsEyedropper, BsFillArrowDownRightCircleFill } from 'react-icons/bs';
import { IoBodySharp } from 'react-icons/io5';
import { MdCleanHands, MdFace2 } from 'react-icons/md';

import { TbHandThreeFingers } from "react-icons/tb";

import React from 'react'
import HeadingAside from './HeadingAside'
import Image from 'next/image'
import { useLocale, useMessages, useTranslations } from 'next-intl'
import ClientOnly from '../components/ClientOnly'
import { Accordion, AccordionItem, Avatar, cn } from '@nextui-org/react'
import Link from 'next/link'
import { CategoryKey, SubcategoryRouteKey, useCategories } from '../hooks/useCategories'
import { IconType } from 'react-icons'
import { BiLeftArrowAlt } from 'react-icons/bi';

interface CurrentParams {
  category: string,
  subCategory: string
}
type ShopAsideProps = {
  currentParams: CurrentParams,
}

export default function ShopAside({

  currentParams
}: ShopAsideProps) {
  const locale = useLocale()
  const t = useTranslations("categories")
  const tshop = useTranslations("shoppage")
  const { allCategories, validateSubcategory } = useCategories()

  return (

    <div className='flex flex-col px-4 sm:px-0'>

      {/* {categories} */}
      <section className='py-1 mb-2'>
        <HeadingAside title={tshop("aside.categories", { locale })} />
        <Accordion
          // selectionMode="multiple"
          defaultExpandedKeys={[currentParams.category]} >
          {allCategories.map(({ label, icon: Icon }) =>
          (
            <AccordionItem key={label}
              aria-label={t(`${label}.label`)}
              title={t(`${label}.label`)}
              indicator={({ isOpen }) => (isOpen && <SunIcon />)}
              subtitle={
                <p className="flex">
                  {t(`${label}.short`)}
                </p>
              }
              startContent={<Icon />}
            >
              <ul>
                {
                  t.rich(`${label}.subs.mapper`, {
                    i: (chunks) => {
                      const routecategory: string = label.split("_").join(" ");

                      const subCategoryKey: SubcategoryRouteKey = validateSubcategory(chunks);
                      const translationKey = `${label}.subs.route.${subCategoryKey}`;
                      // @ts-ignore
                      const routesubCategory = t(translationKey);
                      const i18subCategory = t(`${label}.subs.i18subs`, { sub: subCategoryKey })

                      return (
                        <li key={chunks?.toLocaleString()} className="group py-2 px-8 transition-colors duration-300 ease-in-out">
                          <Link href={`${locale}/shop?category=${routecategory}&subCategory=${routesubCategory}`} color="foreground"
                            className={cn(`group-hover:text-red-dark/50`,
                              currentParams.subCategory === routesubCategory && currentParams.category === routecategory ? "text-red-dark/50" : ""
                            )}>
                            {i18subCategory}
                          </Link>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            </AccordionItem>
          )
          )}
        </Accordion>
      </section>

      {/* {slider} */}
      {/* tops */}
      {/* <section>
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
      </section> */}
    </div >
  )
}

export const SunIcon = (props: any) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="24"
    width="24"
    role="presentation"
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={32}
    />
    <circle
      cx={256}
      cy={256}
      fill="none"
      r={80}
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={32}
    />
  </svg>
);

