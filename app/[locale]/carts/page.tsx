import React from 'react'
import Container from '../components/Container'
import { Breadcrumb } from './Breadcrumbs'
import CartDetails from './CartDetails'
import ClientOnly from '../components/ClientOnly'
import Heading from '../components/Heading'
import getCurrentUser from '../actions/getCurrentUser'
import getCarts from '../actions/getCarts'

type Props = {}

async function page({ }: Props) {

  const currentUser = await getCurrentUser()
  const carts = await getCarts()


  return (
    <Container>
      <Heading
        title="Cart"
        subtitle="List of products you shopping!"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      ></div>
      <ClientOnly>
        <CartDetails currentUser={currentUser} carts={carts} />
      </ClientOnly>
    </Container>
  )
}

export default page