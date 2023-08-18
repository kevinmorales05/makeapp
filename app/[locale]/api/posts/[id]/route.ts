import prisma from "@/app/libs/prismadb";
import { NextResponse } from 'next/server';

interface IParams {
  id?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const body = await request.json();

  return NextResponse.json({ data: "successful post" }, { status: 201 });

}


// export async function GET(request: Request, { params }: { params: IParams }) {

//   async function main() {

//     const { id } = params;


//     // get all
//     // const allUsers = await prisma.user.findMany()


//     // create
//     // await prisma.user.create({
//     //   data: {
//     //     name: 'Alice',
//     //     email: 'alice@prisma.io',
//     //     posts: {
//     //       create: { title: 'why the govern hidden many news nowdays?', content: 'Recently discoverings brought to the light new things to proven something bad for our society' },
//     //     },
//     //     profile: {
//     //       create: { bio: 'I like turtles and journalism but and what what happened with that' },
//     //     },
//     //   },
//     // })

    
// // update
//     // const post = await prisma.post.update({
//     //   where: { id: 1 },
//     //   data: { published: false },
//     // })

//     // await prisma.post.update({
//     //   where: { id: 3 },
//     //   data: { published: true },
//     // })

    
//     // console.log(post)

//     const allUsers = await prisma.user.findMany({
//       include: {
//         posts: true,
//         profile: true,
//       },
//     })
//     console.dir(allUsers, { depth: null })




//   }


//   console.log('you are here')

//   main()
//     .then(async () => {
//       await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//       console.error(e)
//       await prisma.$disconnect()
//       process.exit(1)
//     })
//   return NextResponse.json({ data: "successful" }, { status: 201 });


// }


