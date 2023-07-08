import React from 'react'
import HeadingAside from './HeadingAside';
interface ShopAsideProps {
  title: String;
  body: React.ReactElement;
}
export default function ShopAsideItem({ title, body }: ShopAsideProps) {
  return (
    <div>
      <HeadingAside title={title} />
      {body}
    </div>
  )
}
