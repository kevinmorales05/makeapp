'use client'
import React, { Fragment } from 'react'
import HeadingAside from './HeadingAside'
import Image from 'next/image'
import { Accordion, AccordionItem, Link, cn } from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'


export default function ShopAside({ categories }: { categories: any }) {
  const locale = useLocale()
  const t = useTranslations("shoppage")
  const subCategory = "eyes"
  // const { categories } = useCategories();

  // const shopasideitems = [
  //   {
  //     title: "Categories",
  //     body: (<>
  //       <div className="w-full">
  //         <div className="mx-auto w-full max-w-md rounded-2xl ">
  //           {categories.map(it => (
  //             <DisclosureItem label={it.label} isNested={'sub' in it} nested={'sub' in it ?
  //               <>
  //                 {it.sub?.map(secIt => (<DisclosureItem label={secIt.label} isNested={'sub' in secIt} key={secIt.label} />))}
  //               </>
  //               : <></>}
  //               key={it.label} />
  //           ))
  //           }

  //         </div>
  //       </div>
  //     </>),
  //   },
  //   {
  //     title: "Prices",
  //     body: (<>
  //       {/* <Slider
  //         getAriaLabel={() => 'Minimum distance shift'}
  //         value={[20, 37]}
  //         valueLabelDisplay="auto"
  //         getAriaValueText={(value: number) => {
  //           return `${value}°C`;
  //         }}

  //       /> */}
  //     </>),
  //   },
  //   {
  //     title: "Top 3 For Today",
  //     body: (<>
  //       <div className="flex justify-center align-center ">
  //         <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='cursor-pointer' />
  //         <div className="flex flex-col justify-center align-center">
  //           <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
  //           <span className="text-sm text-[#5e5c5c]">$30.99</span>
  //         </div>
  //       </div>
  //       <div className="flex justify-center align-center cursor-pointer">
  //         <Image src="/img/product1.jpg" alt="image" width={50} height={80} className='cursor-pointer' />
  //         <div className="flex flex-col justify-center align-center">
  //           <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
  //           <span className="text-sm text-[#5e5c5c]">$30.99</span>
  //         </div>
  //       </div>
  //       <div className="flex justify-center align-center cursor-pointer">
  //         <Image src="/img/product1.jpg" alt="image" width={50} height={80} className=' cursor-pointer' />
  //         <div className="flex flex-col justify-center align-center">
  //           <span className="hover:text-red-dark/50 cursor-pointer">Spray Balm With Oat Extract</span>
  //           <span className="text-sm text-[#5e5c5c]">$30.99</span>
  //         </div>
  //       </div>
  //     </>),
  //   },

  // ]

  // const categoriess = (<>
  //   <HeadingAside title="Categories" />
  //   <div className="w-full">
  //     <div className="mx-auto w-full max-w-md rounded-2xl ">
  //       {categories.map(it => (
  //         <DisclosureItem label={it.label} isNested={'sub' in it} nested={'sub' in it ?
  //           <>
  //             {it.sub?.map(secIt => (<DisclosureItem key={secIt.label} label={secIt.label} isNested={'sub' in secIt} />))}
  //           </>
  //           : <></>}
  //           key={it.label} />
  //       ))
  //       }

  //     </div>
  //   </div>

  // </>)

  const tops3 = (<>
    <HeadingAside title={t("aside.tops3", { locale })} />
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
  </>)

  return (
    <div className='
        flex flex-col px-4 sm:px-0
        '>

      {/* {shopasideitems.map((it, index) =>
      <ShopAsideItem key={index} title={it.title} body={it.body} />

    )} */}

      {/* {categoriess} */}
      <section className='py-1 mb-2'>
        <HeadingAside title={t("aside.categories", { locale })} />
        <Accordion selectionMode="multiple" className='hover:text-red-dark/50'>
          {categories.map((i: any, ix: any) => (
            <AccordionItem key={ix} aria-label={i.category} title={i.category} >
              <ul>
                {i.values.map((item: string, index: number) => (
                  <li key={item + index} className='py-2 px-8'>
                    <Link href={`${locale}/shop?category=${i.category}&subCategory=${item}`} color="foreground" className={cn(`hover:text-red-dark/50`,
                      item === subCategory ? "text-red-dark/50" : ""
                    )}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                  </li>
                ))}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* {slider} */}
      {tops3}
    </div>
  )
}
