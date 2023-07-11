'use client'
import React, { Fragment } from 'react'
import ShopAsideItem from './ShopAsideItem'
import HeadingAside from './HeadingAside'
import { Disclosure, Transition } from '@headlessui/react'
import { RiArrowRightSLine, RiArrowUpSLine } from 'react-icons/ri'
import Slider from '@mui/material-next/Slider';
import DisclosureItem from './DisclosureItem'
import Image from 'next/image'
const categories = [
  {
    label: 'news'
  },
  {
    label: 'for men',
  },
  {
    label: 'facial care',
    sub: [
      {
        label: "masks"
      },
      {
        label: "hidrogel patches"
      },
      {
        label: "cleansing oils"
      },
      {
        label: "facial cleansing"
      },
      {
        label: "scrubs and peeling"
      },
      {
        label: "tonic"
      },
      {
        label: "serum and essence"
      },
      {
        label: "emulsion"
      },
      {
        label: "eye contour"
      },
      {
        label: "creams"
      },
      {
        label: "oil facial"
      },
      {
        label: "cosmetic set"
      },
      {
        label: "solar protection"
      },
      {
        label: "mist"
      },
    ]
  },
  {
    label: 'body',
    sub: [
      {
        label: "bb cream"
      },
      {
        label: "bb cushion"
      },
      {
        label: "lipstick"
      },
      {
        label: "concealers"
      },
      {
        label: "masks"
      },
      {
        label: "primer"
      },
    ]
  },
  {
    label: 'type of skin',
    sub: [
      {
        label: "mixed skin"
      },
      {
        label: "oily skin"
      },
      {
        label: "dry skin"
      },
      {
        label: "sensitive skin"
      },
      {
        label: "normal"
      },
      {
        label: "acne skin"
      },
      {
        label: "enlarge pores"
      },
      {
        label: "blotchy skin"
      },
      {
        label: "wrinkled skin"
      },
    ]
  },
  {
    label: 'hands and feet',
  },
  {
    label: 'hair',
  },
  {
    label: 'mask bar',
  },
  {
    label: 'accessories',
  },
  {
    label: "complete routines",
  },
  {
    label: 'microneedle patches',
  },
  {
    label: 'brands',
    sub: [
      {
        label: "ACROPASS"
      },
      {
        label: "D'ALBA"
      },
      {
        label: "SKIN 79"
      },
      {
        label: "KLAIRS"
      },
      {
        label: "BENTON"
      },
      {
        label: "ELIZABETH"
      },
      {
        label: "TONY MOLY"
      },
      {
        label: "MISSHA"
      },
      {
        label: "TOO COOL FOR SCHOOL"
      },
      {
        label: "EXFOLIATION"
      },
      {
        label: "MEDIHEAL"
      },
      {
        label: "SECRET KEY"
      },
      {
        label: "PURITO"
      },
      {
        label: "IT'S SKIN"
      },
      {
        label: "ID PLACOSMETICS"
      },
      {
        label: "SHEATH SKIN"
      },
      {
        label: "MY NAME IS ACACI"
      },
      {
        label: "YADAH"
      },
      {
        label: "MANYO"
      },
      {
        label: "LA'DOR"
      },
      {
        label: "CLAVUS"
      },
      {
        label: "WELCOME"
      },
      {
        label: "BANILA CO"
      },
      {
        label: "BEAUTY OF JOSEON"
      },
      {
        label: "SOME BY MI"
      },
      {
        label: "MEDI-PEEL"
      },
      {
        label: "LOOK AT ME"
      },
      {
        label: "COSRX"
      },
      {
        label: "NEOGEN"
      },
      {
        label: "HEIMISH"
      },
    ]
  },
]

export default function ShopAside() {

  const shopasideitems = [
    {
      title: "Categories",
      body: (<>
        <div className="w-full">
          <div className="mx-auto w-full max-w-md rounded-2xl ">
            {categories.map(it => (
              <DisclosureItem label={it.label} isNested={'sub' in it} nested={'sub' in it ?
                <>
                  {it.sub?.map(secIt => (<DisclosureItem label={secIt.label} isNested={'sub' in secIt} />))}
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
        <Slider
          getAriaLabel={() => 'Minimum distance shift'}
          value={[20, 37]}
          valueLabelDisplay="auto"
          getAriaValueText={(value: number) => {
            return `${value}°C`;
          }}
          disableSwap
        />
      </>),
    },
    {
      title: "Top 3 For Today",
      body: (<>
        <div className="flex justify-center align-center">
            <Image src="/images/product1.jpg" alt="image" width={50} height={80} className='mx-4' />
            <div className="flex flex-col justify-center align-center">
              <span className="hover:text-red-dark/50">Spray Balm With Oat Extract</span>
              <span className="text-sm text-[#5e5c5c]">$30.99</span>
            </div>
        </div>
        <div className="flex justify-center align-center">
            <Image src="/images/product1.jpg" alt="image" width={50} height={80} className='mx-4' />
            <div className="flex flex-col justify-center align-center">
              <span className="hover:text-red-dark/50">Spray Balm With Oat Extract</span>
              <span className="text-sm text-[#5e5c5c]">$30.99</span>
            </div>
        </div>
        <div className="flex justify-center align-center">
            <Image src="/images/product1.jpg" alt="image" width={50} height={80} className='mx-4' />
            <div className="flex flex-col justify-center align-center">
              <span className="hover:text-red-dark/50">Spray Balm With Oat Extract</span>
              <span className="text-sm text-[#5e5c5c]">$30.99</span>
            </div>
        </div>
      </>),
    },

  ]

  return (
    <div className='
        flex flex-col 
        '>{shopasideitems.map((it, index) =>
      <ShopAsideItem key={index} title={it.title} body={it.body} />

    )}
    </div>
  )
}
