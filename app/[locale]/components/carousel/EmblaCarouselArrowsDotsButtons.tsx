// 'use client'

// type DotButtonPropType = {
//   selected: boolean
//   onClick: () => void
// }

// export const DotButton: React.FC<DotButtonPropType> = (props) => {
//   const { selected, onClick } = props

//   return (
//     <button
//       className={'embla__dot'.concat(selected ? ' embla__dot--selected' : '')}
//       type="button"
//       onClick={onClick}
//     />
//   )
// }

// type PrevNextButtonPropType = {
//   enabled: boolean
//   onClick: () => void
// }

// export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
//   const { enabled, onClick } = props

//   return (
//     <button
//       className="embla__button embla__button--prev"
//       onClick={onClick}
//       disabled={!enabled}
//     >
//       <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
//         <path
//           fill="currentColor"
//           d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z"
//         />
//       </svg>
//     </button>
//   )
// }

// export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
//   const { enabled, onClick } = props

//   return (
//     <button
//       className="embla__button embla__button--next"
//       onClick={onClick}
//       disabled={!enabled}
//     >
//       <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
//         <path
//           fill="currentColor"
//           d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z"
//         />
//       </svg>
//     </button>
//   )
// }


// import React, { PropsWithChildren } from 'react'

// type PropType = PropsWithChildren<
//   React.DetailedHTMLProps<
//     React.ButtonHTMLAttributes<HTMLButtonElement>,
//     HTMLButtonElement
//   >
// >

// export const DotButton: React.FC<PropType> = (props) => {
//   const { children, ...restProps } = props

//   return (
//     <button type="button" {...restProps}>
//       {children}
//     </button>
//   )
// }

// export const PrevButton: React.FC<PropType> = (props) => {
//   const { children, ...restProps } = props

//   return (
//     <button
//       className="embla__button embla__button--prev"
//       type="button"
//       {...restProps}
//     >
//       <svg className="embla__button__svg" viewBox="0 0 532 532">
//         <path
//           fill="currentColor"
//           d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
//         />
//       </svg>
//       {children}
//     </button>
//   )
// }

// export const NextButton: React.FC<PropType> = (props) => {
//   const { children, ...restProps } = props

//   return (
//     <button
//       className="embla__button embla__button--next"
//       type="button"
//       {...restProps}
//     >
//       <svg className="embla__button__svg" viewBox="0 0 532 532">
//         <path
//           fill="currentColor"
//           d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
//         />
//       </svg>
//       {children}
//     </button>
//   )
// }


// another one

import React, { PropsWithChildren } from 'react'

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
        />
      </svg>
      {children}
    </button>
  )
}

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button
      className="embla__button embla__button--next"
      type="button"
      {...restProps}
    >
      <svg className="embla__button__svg" viewBox="0 0 532 532">
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg>
      {children}
    </button>
  )
}
