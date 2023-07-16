import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookSquare } from 'react-icons/fa'


export default function Footer() {
  return (
    <div className="flex items-center justify-center flex-col my-2">
      <Image src="/img/logo.png" alt="Korean Cosmetic" width="50" height="50" />
      <p className="text-gray-400">Secure payment guarantee</p>
      <p className="w-[50%] text-sm">All the data entered in the forms of our online store are stored securely encrypted under the SSL certified security protocol. In the same way, the payment system is carried out through a secure bank gateway.</p>
      <div className="icons flex items-center justify-around flex-wrap w-full md:w-1/4  my-2">
        <Image src="/img/icons/visa.png" alt="visa" width="30" height="30" />
        <Image src="/img/icons/mastercard.png" alt="visa" width="30" height="30" />
        <Image src="/img/icons/paypal.png" alt="visa" width="30" height="30" />
      </div>
      <div className="links my-2">
        <Link href="/conditions" aria-label='Purchase Conditions' />
        <Link href="/contact" aria-label='Contact' />
        <Link href="/Legal Notice and data protection" aria-label='Legal' />

      </div>
      <div className="flex items-center justify-center my-2 flex-col">
        <p className="w-full">Follow us  on social networks</p>
        <div className="flex">
          <AiOutlineInstagram className="mx-2" style={{ width: "30", height: "30" }} />
          <FaFacebookSquare className="mx-2" style={{ width: "30", height: "30" }} />
        </div>
      </div>
    </div>
  )
}
