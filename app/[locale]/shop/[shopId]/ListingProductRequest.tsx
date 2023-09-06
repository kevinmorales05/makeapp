
import Button from '@/app/components/buttons/Button'

import { IProductFormatted } from '@/app/hooks/useProducts'
import React from 'react'

type Props = {
  price: number,
  handlerButton: (listing: IProductFormatted) => void,
  listing: IProductFormatted
}

const ListingProductRequest = ({ price, handlerButton, listing }: Props) => {
  return (
    <div>
      <p>Price: ${price}</p>
      <Button label='Buy' onClick={()=>handlerButton(listing)} />
    </div>
  )
}

export default ListingProductRequest