import React from 'react'
import Container from '../components/Container'
import { Breadcrumb } from './Breadcrumb'
import CartDetails from './CartDetails'

type Props = {}

function page({ }: Props) {
  return (
    <div className=''>
      <CartDetails />
    </div>
  )
}

export default page