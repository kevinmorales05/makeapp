'use client'
import { useLocale } from 'next-intl'
import Link from 'next-intl/link'
import React from 'react'


type Props = {}

export const Breadcrumb = (props: Props) => {
  const locale = useLocale()
  return (
    <>
      {Array.from(["Cart", "Information", "Information"]).map(item => (
        <Link href={item.toLowerCase()} locale={locale}> {item.charAt(0).toUpperCase() + item.toUpperCase()}</Link >
      ))}
    </>
  )
}