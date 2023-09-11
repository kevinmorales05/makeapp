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

  // console.log("verifying category", t("all."))

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (

    <div className='flex flex-col px-4 sm:px-0'>

      {/* {categories} */}
      <section className='py-1 mb-2'>
        <Accordion selectionMode="multiple">
          <AccordionItem
            key="1"
            aria-label="Chung Miller"

            subtitle="4 unread messages"
            title="Chung Miller"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Janelle Lenard"
            startContent={
              <Avatar
                isBordered
                color="success"
                radius="lg"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            }
            subtitle="3 incompleted steps"
            title="Janelle Lenard"
          >
            {defaultContent}
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Zoey Lang"
            startContent={
              <Avatar
                isBordered
                color="warning"
                radius="lg"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
              />
            }
            subtitle={
              <p className="flex">
                2 issues to<p className="text-primary ml-1">fix now</p>
              </p>
            }
            title="Zoey Lang"
          >
            {defaultContent}
          </AccordionItem>
        </Accordion>
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
    </div >
  )
}


export const AnchorIcon = (props: any) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 24 24"
    width="24"
    {...props}
  >
    <path
      d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z"
      fill="currentColor"
    />
    <path
      d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z"
      fill="currentColor"
    />
  </svg>
);

export const MoonIcon = (props: any) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="24"
    role="presentation"
    viewBox="0 0 512 512"
    width="24"
    {...props}
  >
    <path
      d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={32}
    />
  </svg>
);

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

