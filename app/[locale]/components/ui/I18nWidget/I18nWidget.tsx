'use client'

import useCountries from "@/app/hooks/useCountries";
import { useLocale } from "next-intl"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, User, Selection } from "@nextui-org/react";
import React, { SetStateAction } from "react";
import { US } from 'country-flag-icons/react/3x2'
import { EC } from 'country-flag-icons/react/3x2'
import { KR } from 'country-flag-icons/react/3x2'
import { useRouter } from 'next-intl/client';


function I18nWidget() {
  const locale = useLocale();
  const { getByFlag } = useCountries()
  const router = useRouter()

  // const [selectedKeys, setSelectedKeys] = React.useState();
  // // const selectedFlag = React.useMemo(
  // //   () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
  // //   [selectedKeys]
  // //   );
  let Flag = getByFlag(locale)

  // console.log('selectedkeys', selectedKeys)
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";


  const items = [
    {
      key: "es",
      label: "Español",
      icon: EC,
      onclick: () => router.push('/', { locale: 'es' })
    },
    {
      key: "en",
      label: "Ingles",
      icon: US,
      onclick: () => router.push('/', { locale: 'en' })

    },
    {
      key: "ko",
      label: "Coreano",
      icon: KR,
      onclick: () => router.push('/', { locale: 'ko' })
    },
  ];


  const onActionHanlder = (e: any) => {
    console.log('action', e)

  }
  //aria-label="Dynamic Actions" items={items} onAction={onActionHanlder}
  return (
    <div className='fixed top-3 right-5'>

      <Dropdown>
        <DropdownTrigger>
          <Button size="sm" startContent={<Flag />} isIconOnly variant="light" aria-label={locale} />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection actions"
          variant="flat"
          disallowEmptySelection
          defaultSelectedKeys={[locale]}
          disabledKeys={[locale]}
          selectionMode="single"
          // selectedKeys={selectedKeys}
          // onSelectionChange={(keys: Selection | React.Key[] | any): void => setSelectedKeys(keys)}
          items={items}
        >
          {(item: any) => (
            <DropdownItem
              key={item.key}
              color={item.key === "ko" ? "danger" : "default"}
              className={item.key === "ko" ? "text-danger" : ""}
              onPress={item.onclick}
              startContent={<Button size="sm" startContent={<item.icon className={iconClasses} />} isIconOnly variant="light" aria-label={locale} />}
            >
              {item.label}
            </DropdownItem>
          )}
          {/* <DropdownItem key="text">Text</DropdownItem>
          <DropdownItem key="number">Number</DropdownItem>
          <DropdownItem key="date">Date</DropdownItem>
          <DropdownItem key="single_date">Single Date</DropdownItem>
          <DropdownItem key="iteration">Iteration</DropdownItem> */}
        </DropdownMenu>
      </Dropdown>

    </div>
  )
}

export default I18nWidget


// import cn from 'classnames'
// import Link from 'next/link'
// import { FC, useState } from 'react'
// import { useRouter } from 'next/router'
// import s from './I18nWidget.module.css'
// import Cross from '../../icons/Cross'
// // import { Cross } from '@components/icons'
// interface LOCALE_DATA {
//     name: string
//     img: {
//         filename: string
//         alt: string
//     }
// }

// const LOCALES_MAP: Record<string, LOCALE_DATA> = {
//     es: {
//         name: 'Español',
//         img: {
//             filename: 'flag-es-co.svg',
//             alt: 'Bandera Colombiana',
//         },
//     },
//     'en-US': {
//         name: 'English',
//         img: {
//             filename: 'flag-en-us.svg',
//             alt: 'US Flag',
//         },
//     },
// }

// const I18nWidget: FC = () => {
//     const [display, setDisplay] = useState(false)
//     const {
//         locale,
//         locales,
//         defaultLocale = 'en-US',
//         asPath: currentPath,
//     } = useRouter()
//     const options = locales?.filter((val) => val !== locale)
//     const currentLocale = locale || defaultLocale

//     return (
//         <nav className={s.root}>
//             <div className="flex items-center relative">
//                 <button className={s.button} aria-label="Language selector" />
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                     className="block mr-2 w-5"
//                     src={`/${LOCALES_MAP[currentLocale].img.filename}`}
//                     alt={LOCALES_MAP[currentLocale].img.alt}
//                 />
//                 {options && (
//                     <span className="cursor-pointer" onClick={() => setDisplay(!display)}>
//                         <svg
//                             viewBox="0 0 24 24"
//                             width="24"
//                             height="24"
//                             stroke="currentColor"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             fill="none"
//                             shapeRendering="geometricPrecision"
//                         >
//                             <path d="M6 9l6 6 6-6" />
//                         </svg>
//                     </span>
//                 )}
//             </div>
//             <div className="absolute top-0 right-0">
//                 {options?.length && display ? (
//                     <div className={s.dropdownMenu}>
//                         <div className="flex flex-row justify-end px-6">
//                             <button
//                                 onClick={() => setDisplay(false)}
//                                 aria-label="Close panel"
//                                 className={s.closeButton}
//                             >
//                                 <Cross className="h-6 w-6" />
//                             </button>
//                         </div>
//                         <ul>
//                             {options.map((locale) => (
//                                 <li key={locale}>
//                                     <Link
//                                         href={currentPath}
//                                         locale={locale}
//                                         className={cn(s.item)}
//                                         onClick={() => setDisplay(false)}
//                                     >
//                                         {LOCALES_MAP[locale].name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ) : null}
//             </div>
//         </nav>
//     )
// }

// export default I18nWidget