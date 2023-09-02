import { Button } from '@nextui-org/react'
import React from 'react'
import { AiOutlineShopping } from 'react-icons/ai'

type Props = {
    onOpenModal: () => void,
    endText?: boolean
}

const HasAccount = (props: Props) => {
    const { onOpenModal, endText } = props
    return (
        <span className={`block ${endText && "text-end"}`}>Already have an account?<Button onPress={() => onOpenModal()} disableAnimation className='underline decoration-1 bg-transparent font-bold gap-1 p-0' endContent={<AiOutlineShopping className='font-bold text-base' />}>Login</Button></span>
    )
}

export default HasAccount