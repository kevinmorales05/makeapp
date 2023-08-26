import React from 'react'
import { Breadcrumb } from './Breadcrumb'
import Link from 'next-intl/dist/link'
import useLoginModal from '../hooks/useLoginModal'

type Props = {}

const CartDetails = (props: Props) => {

    const {isOpen} =  useLoginModal()
    return (
        <div>
            <div className='flex justify-between items-center'>
            <Breadcrumb />
            <div className='block'>Already have an account? <span className='text-'>Login</span></div>
            </div>
        </div>
    )
}

export default CartDetails