import Button from '@/app/components/Button'
import React from 'react'

type Props = {
  price: number,
  handlerButton: () => void
}

const ListingProductRequest = ({ price, handlerButton }: Props) => {
  return (
    <div>
      <p>Price: ${price}</p>
      <Button label='Buy' onClick={handlerButton} />
    </div>
  )
}

export default ListingProductRequest