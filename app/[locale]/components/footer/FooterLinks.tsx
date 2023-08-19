'use client'
import Link from 'next/link'
export default function FooterLinks() {
  return (
    <div className="links my-2">
      <Link href="/conditions" aria-label='Purchase Conditions' >Conditions</Link>
      <Link href="/contact" aria-label='Contact'>Contact</Link>
      <Link href="/Legal Notice and data protection" aria-label='Legal' >Legal</Link>
    </div>
  )
}
