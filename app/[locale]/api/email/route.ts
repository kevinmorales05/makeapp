import { html } from "@/app/emails/html";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { toEmail, subject } = body

        const fromAddress = process.env.NODEMAILER_ACCOUNT as string;
        const fromName = process.env.NEXT_PUBLIC_NAME_APP as string;

        const hostname = process.env.NODE_ENV !== 'development' ? process.env.HOST as string : 'localhost';

        const pw = process.env.NODEMAILER_PW as string;

        const transporter = nodemailer.createTransport({
            host: hostname,
            port: 587,
            service: "gmail",
            secure: false,
            requireTLS: true,
            auth: {
                user: fromAddress,
                pass: pw,
            },
            logger: process.env.NODE_ENV === 'development',
        });

        const mailData: Mail.Options = {
            from: {
                name: fromName,
                address: fromAddress,
            },
            to: toEmail,
            subject,
            html: html
        };

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    reject(error);
                } else {
                    resolve(success);
                }
            });
        });

        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });

        return NextResponse.json("sucess", { status: 200 })
    } catch (err) {
        NextResponse.error();
    }
};