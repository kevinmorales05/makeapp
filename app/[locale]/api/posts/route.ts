import prisma from "@/app/libs/prismadb";
import { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server';

interface IParams {
  id?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

  const body = await request.json();

  console.dir(body)

  const result = await prisma.product.createMany({
    data: body
  })




  return NextResponse.json({ result, body }, { status: 201 });

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
