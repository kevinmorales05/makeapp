import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const pokeDito = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto")

    return NextResponse.json(pokeDito.data)
}
