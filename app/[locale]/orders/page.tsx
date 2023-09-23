import React, { Suspense } from 'react'
import Container from '../components/Container'
import Await from '../await'
import getOrders from '../actions/getOrders'
import ClientOrders from './ClientOrders'

type Props = {}

const OrderPage = (props: Props) => {

  return (
    <Container>
      <Suspense fallback={<>Loading..</>}>
        <Await promise={getOrders()}>
          {(orders) => <ClientOrders orders={orders} />}
        </Await>
      </Suspense>
    </Container>
  )
}

export default OrderPage