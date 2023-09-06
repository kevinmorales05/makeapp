import ToasterProvider from './ToasterProvider'
import ModalsProvider from './ModalsProvider'
import { NextUI } from './NextUI'
import { SessionProvider } from "next-auth/react"

type Props = { children: React.ReactNode }

export default function Providers({ children }: Props) {
    return (
        <>
            <ToasterProvider />
            <ModalsProvider />
            <NextUI>
                {children}
            </NextUI>
        </>
    )
}   