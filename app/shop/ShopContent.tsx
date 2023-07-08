import React from 'react'
import ShopAside from './ShopAside'
import ShopMain from './ShopMain'

export default function ShopContent() {
  return (
    <div className='flex flex-wrap justify-between text-start'>
          <ShopAside /> 
          <ShopMain />
    </div>
  )
}
