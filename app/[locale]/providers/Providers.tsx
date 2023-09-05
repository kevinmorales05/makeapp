import ToasterProvider from './ToasterProvider'
import ModalsProvider from './ModalsProvider'

export default async function Providers() {
    return (
        <>
            <ToasterProvider />
            <ModalsProvider />
        </>
    )
}   