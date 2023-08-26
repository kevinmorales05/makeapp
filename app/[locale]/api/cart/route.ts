import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';

interface IParams {
    // id?: string;
    params?: {
        locale?: string;
    }

}

export async function POST(request: Request, props: IParams) {
    const body = await request.json();
    const { data } = body


    // const newCarting = await prisma.user.create({
    //     data: {
    //         email: "somos@example.com",
    //         carts: {

    //             create: [
    //                 {
    //                     productId: data.id
    //                 }

    //             ]
    //         },
    //     },
    // })

    // const newCarting = await prisma.cart.create({
    //     data: {

    //         productId: data.productId,
    //         userId: data.userId,
    //         quantity: data.quantity,

    //     }
    // })

    // const createCategory = await prisma.post.create({
    //     data: {
    //       title: 'How to be Bob',
    //       categories: {
    //         create: [
    //           {
    //             assignedBy: 'Bob',
    //             assignedAt: new Date(),
    //             category: {
    //               create: {
    //                 name: 'New category',
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   })


    return NextResponse.json({ data: "successful post" }, { status: 201 });

}


export async function GET(request: Request, { params }: { params: IParams }) {


    // const { id } = params;
    // get all
    const result = await prisma.product.findMany()

    return NextResponse.json({ result }, { status: 201 });


}

export async function DELETE(request: Request, { params }: { params: IParams }) {

    const res = await prisma.product.deleteMany()


    return NextResponse.json({ res }, { status: 201 });

}
