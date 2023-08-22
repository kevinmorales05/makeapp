'use client'
import React, { Fragment } from 'react'
import ShopAsideItem from './ShopAsideItem'
import HeadingAside from './HeadingAside'
import { Disclosure, Transition } from '@headlessui/react'
import { RiArrowRightSLine, RiArrowUpSLine } from 'react-icons/ri'
import DisclosureItem from './DisclosureItem'
import Image from 'next/image'
import { useCategories } from '../hooks/useCategories'


export default function ShopAside({ categories:anl }: {categories: any[]}) {

  const { categories } = useCategories();

  const shopasideitems = [
    {
      title: "Categories",
      body: (<>
        <div className="w-full">
          <div className="mx-auto w-full max-w-md rounded-2xl ">
            {categories.map(it => (
              <DisclosureItem label={it.label} isNested={'sub' in it} nested={'sub' in it ?
                <>
                  {it.sub?.map(secIt => (<DisclosureItem label={secIt.label} isNested={'sub' in secIt} key={secIt.label} />))}
                </>
                : <></>}
                key={it.label} />
            ))
            }

          </div>
        </div>
      </>),
    },
    {
      title: "Prices",
      body: (<>
        {/* <Slider
          getAriaLabel={() => 'Minimum distance shift'}
          value={[20, 37]}
          valueLabelDisplay="auto"
          getAriaValueText={(value: number) => {
            return `${value}°C`;
          }}

        /> */}
      </>),
    },
    {
      title: "Top 3 For Today",
      body: (<>
        <div className="flex justify-center align-center ">
          <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='cursor-pointer' />
          <div className="flex flex-col justify-center align-center">
            <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
            <span className="text-sm text-[#5e5c5c]">$30.99</span>
          </div>
        </div>
        <div className="flex justify-center align-center cursor-pointer">
          <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='cursor-pointer' />
          <div className="flex flex-col justify-center align-center">
            <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
            <span className="text-sm text-[#5e5c5c]">$30.99</span>
          </div>
        </div>
        <div className="flex justify-center align-center cursor-pointer">
          <Image src="/img/product1.jpg" alt="image" width={50} height={80} className=' cursor-pointer' />
          <div className="flex flex-col justify-center align-center">
            <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
            <span className="text-sm text-[#5e5c5c]">$30.99</span>
          </div>
        </div>
      </>),
    },

  ]

  const categoriess = (<>
    <HeadingAside title="Categories" />
    <div className="w-full">
      <div className="mx-auto w-full max-w-md rounded-2xl ">
        {categories.map(it => (
          <DisclosureItem label={it.label} isNested={'sub' in it} nested={'sub' in it ?
            <>
              {it.sub?.map(secIt => (<DisclosureItem key={secIt.label} label={secIt.label} isNested={'sub' in secIt} />))}
            </>
            : <></>}
            key={it.label} />
        ))
        }

      </div>
    </div>

  </>)
  const slider = (<>
    <HeadingAside title="Prices" />
    some price
  </>)

  const must = (<>
    <HeadingAside title="Top 3 For Today" />
    <div className="flex justify-center align-center ">
      <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='cursor-pointer' />
      <div className="flex flex-col justify-center align-center">
        <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
        <span className="text-sm text-[#5e5c5c]">$30.99</span>
      </div>
    </div>
    <div className="flex justify-center align-center ">
      <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='cursor-pointer' />
      <div className="flex flex-col justify-center align-center">
        <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
        <span className="text-sm text-[#5e5c5c]">$30.99</span>
      </div>
    </div>
    <div className="flex justify-center align-center ">
      <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='cursor-pointer' />
      <div className="flex flex-col justify-center align-center">
        <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
        <span className="text-sm text-[#5e5c5c]">$30.99</span>
      </div>
    </div>
  </>)

  return (
    <div className='
        flex flex-col 
        '>{shopasideitems.map((it, index) =>
      <ShopAsideItem key={index} title={it.title} body={it.body} />

    )}

      {categoriess}
      {slider}
      {must}
    </div>
  )
}
