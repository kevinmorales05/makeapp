'use client'
import React, { Fragment } from 'react'
import ShopAsideItem from './ShopAsideItem'
import HeadingAside from './HeadingAside'
import { Disclosure, Transition } from '@headlessui/react'
import { RiArrowRightSLine, RiArrowUpSLine } from 'react-icons/ri'
import Slider from '@mui/material-next/Slider';
import DisclosureItem from './DisclosureItem'
import Image from 'next/image'
import { useCategories } from '../hooks/useCategories'


function valueLabelFormat(value: number) {
  const units = ['KB', 'MB', 'GB', 'TB'];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1024 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1024;
  }

  return `${scaledValue} ${units[unitIndex]}`;
}

export default function ShopAside() {

  const [value, setValue] = React.useState<number>(10);
  const { categories } = useCategories();

  function calculateValue(value: number) {
    return 2 ** value;
  }

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
    console.log('values', newValue)
  };


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

        />
      </>),
    },
    {
      title: "Top 3 For Today",
      body: (<>
        <div className="flex justify-center align-center ">
          <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='mx-4 cursor-pointer' />
          <div className="flex flex-col justify-center align-center">
            <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
            <span className="text-sm text-[#5e5c5c]">$30.99</span>
          </div>
        </div>
        <div className="flex justify-center align-center cursor-pointer">
          <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='mx-4 cursor-pointer' />
          <div className="flex flex-col justify-center align-center">
            <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
            <span className="text-sm text-[#5e5c5c]">$30.99</span>
          </div>
        </div>
        <div className="flex justify-center align-center cursor-pointer">
          <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='mx-4 cursor-pointer' />
          <div className="flex flex-col justify-center align-center">
            <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
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

      after component
      <Slider
        value={value}
        min={5}
        step={1}
        max={30}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </div>
  )
}
