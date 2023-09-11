'use server'

import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    icon: IconType
}

const AccordionIcon = ({ icon: Icon }: Props) => {
    return (
        <Icon />
    )
}

export default AccordionIcon