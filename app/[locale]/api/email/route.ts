import { sendMail } from "@/app/actions/emailService";
import { NextRequest, NextResponse } from "next/server";

type Props = {}

export async function POST(req: Request, props: Props) {
    try {
        const { method } = req;
        const body = await req.json()
        const { toEmail, subject, html } = body

        console.log("gimme body", body)
        await sendMail(
            toEmail,
            subject,
            html,
        );
        return NextResponse.json("sucess", { status: 201 })

        // switch (method) {
        //     case "POST": {
        //         //Do some thing
        //         await sendMail(
        //             "dontkillme@bunnyfiedlabs.com",
        //             "TEST",
        //             "THI IS A TEST FOR MY MEDIUM USERS"
        //         );
        //         return NextResponse.json("sucess", { status: 201 })
        //         break;
        //     }
        //     case "GET": {
        //         //Do some thing
        //         return NextResponse.json("get function not implemented", { status: 201 })
        //         break;
        //     }
        //     default:
        //         return NextResponse.json(`Method ${method} Not Allowed`, { status: 405 })
        //         // .setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        //         // res.status(405).end(`Method ${method} Not Allowed`);
        //         break;
        // }
    } catch (err) {
        NextResponse.error();
    }
};