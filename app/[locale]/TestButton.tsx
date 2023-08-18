'use client'

import useTestPrima from "./hooks/usePost"

type Props = {}

export default function TestButton({ }: Props) {

  const { query } = useTestPrima()

  return (
    <div><button onClick={() => { query() }}>on click to call query</button></div>
  )
}