import React from 'react'
import Container from '../components/Container'
import CartClient from './CartClient'
import ClientOnly from '../components/ClientOnly'
import Heading from '../components/Heading'
import getCurrentUser from '../actions/getCurrentUser'
import getCarts from '../actions/getCarts'
import getItemsCarousel from '../actions/getItemsCarousel'
import { formattedCarts, formattedProducts } from '../hooks/useProducts'
import { SafeCart, SafeProducts, SafeUser } from '../types'

type Props = {}

async function page({ }: Props) {

  const currentUser: SafeUser | null = await getCurrentUser()
  const carts: SafeCart[] = await getCarts()

  const slides_count = 10;
  const itemsCarousel: SafeProducts[] = await getItemsCarousel(slides_count);


  return (
    <Container>
      <ClientOnly>
        <CartClient currentUser={currentUser} carts={formattedCarts(carts)} itemsCarousel={formattedProducts(itemsCarousel)} />
      </ClientOnly>
    </Container>
  )
}

export default page