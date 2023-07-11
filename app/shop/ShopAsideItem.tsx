import React from 'react'
import HeadingAside from './HeadingAside';
interface ShopAsideProps {
  title: String;
  body: React.ReactElement;
}
export default function ShopAsideItem({ title, body }: ShopAsideProps) {
  return (
    <div className='mb-8 p-4'>
      <HeadingAside title={title} />
      {body}
    </div>
  )
}
