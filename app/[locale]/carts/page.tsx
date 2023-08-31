import React from 'react'
import Container from '../components/Container'
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
        <ClientOnly>
          <CartDetails currentUser={currentUser} carts={carts} />
        </ClientOnly>
    </Container>
  )
}

export default page