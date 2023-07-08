import React from 'react'
import Container from '../components/Container'
import ShopContent from './ShopContent'
import ClientOnly from '../components/ClientOnly'

export default function page() {
    return (
        <ClientOnly>
            <Container>
                <ShopContent />
            </Container>
        </ClientOnly>
    )
}
