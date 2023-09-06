type ShopProps = {
    children: React.ReactNode
    params: { locale: string }
  }

export const metadata = {
    title: 'Shop',
    description: 'Shop page',
    keywords: 'home, page'
}

export const dynamic = 'auto'

export default async function ShopLayout({
    children,
    params: { locale }
}: ShopProps) { 
    return (
        <>
            {children}
        </>
    )
}
    