'use client'

import useCountries from "@/app/hooks/useCountries";
import { useLocale } from "next-intl"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

function I18nWidget() {
  const locale = useLocale();
  const { getByFlag } = useCountries()
  const Flag = getByFlag(locale)

  const items = [
    {
      key: "es",
      label: "Espaniol",
    },
    {
      key: "en",
      label: "Ingles",
    },
    {
      key: "ko",
      label: "Coreano",
    },
  ];

  return (
    <div className='fixed top-3 right-5'>

      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
          >
            <Flag />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {(item: any) => (
            <DropdownItem
              key={item.key}
              color={item.key === "ko" ? "danger" : "default"}
              className={item.key === "ko" ? "text-danger" : ""}
            >
              {item.label}
            </DropdownItem>
          )}
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