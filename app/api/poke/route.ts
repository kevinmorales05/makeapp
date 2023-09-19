import axios from "axios"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
    return NextResponse.json({ data: data.data })
}