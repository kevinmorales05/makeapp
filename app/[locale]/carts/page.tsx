import React, { Suspense } from 'react'
import Container from '../components/Container'
import CartClient from './CartClient'
import getCurrentUser from '../actions/getCurrentUser'
import getCarts from '../actions/getCarts'
import getItemsCarousel from '../actions/getItemsCarousel'
import { formattedCarts, formattedProducts } from '../hooks/useProducts'
import { SafeCart, SafeProducts, SafeUser } from '../types'
import Await from '../await'

export const dynamic = "force-dynamic";

async function ShopCart() {
  const currentUser: SafeUser | null = await getCurrentUser()
  // const carts: SafeCart[] = await 

  const slides_count = 10;
  const itemsCarousel: SafeProducts[] = await getItemsCarousel(slides_count);


  return (
    <Container>
      <Suspense fallback={<>Loading..</>}>
        <Await promise={getCarts()}>
          {(carts: SafeCart[]) =>
            <CartClient currentUser={currentUser} carts={formattedCarts(carts)} itemsCarousel={formattedProducts(itemsCarousel)} />
          }
        </Await>
      </Suspense>
    </Container>
  )
}

export default ShopCart