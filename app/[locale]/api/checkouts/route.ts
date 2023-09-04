import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { produce } from "immer";
import { NextResponse } from 'next/server';


interface IParams {
    params?: {
        locale?: string;
    }
}

export async function POST(request: Request, props: IParams) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.error()
        }

        const body = await request.json();
        const { data } = body

        const checkout = await prisma.checkout.create({
            data: {
                userId: user.id,
                contact: data.contact,
                deliveryMethods: data.deliveryMethods,
                deliveryShip: data.deliveryShip,
                deliveryPickup: data.deliveryPickup,
                items: data.items
            }
        })

        console.log("server checkout: ", checkout)
        if (!checkout) return NextResponse.error()

        return NextResponse.json(checkout, { status: 201 });
    } catch (e) {
        return NextResponse.error();
    }
}