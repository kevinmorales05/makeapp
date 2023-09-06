export default async function Await<T>({
    promise,
    children
}: {
    promise: Promise<T>
    children: any
    // JSX.Element
}) {
    let data = await promise

    return children
}
