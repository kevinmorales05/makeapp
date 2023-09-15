import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// const nodemailer = require("nodemailer");

// async function main() {
//     const hostname = "hostname from account page";
//     const username = "username from account page";
//     const pw = "password from account page";

//     const transporter = nodemailer.createTransport({
//         host: hostname,
//         port: 587,
//         secure: false,
//         requireTLS: true,
//         auth: {
//             user: username,
//             pass: pw,
//         },
//         logger: true
//     });
//     const info = await transporter.sendMail({
//         from: '"Sender Name" <from@example.net>',
//         to: "to@example.com",
//         subject: "Hello from node",
//         text: "Hello world?",
//         html: "<strong>Hello world?</strong>",
//         headers: { 'x-myheader': 'test header' }
//     });

//     console.log("Message sent: %s", info.response);
// }
//-----------------------------------------------------------------------------
export async function sendMail(toEmail: string, subject: string, html: string) {
    const from = process.env.NODEMAILER_ACCOUNT as string;
    const hostname = process.env.NODE_ENV !== 'development' ? process.env.HOST as string : 'localhost';
    const pw = process.env.NODEMAILER_PW as string;

    var transporter = nodemailer.createTransport({
        host: hostname,
        port: 587,
        service: "gmail",
        secure: false,
        requireTLS: true,
        auth: {
            user: from,
            pass: pw,
        },
        logger: process.env.NODE_ENV === 'development',
    });

    var mailOptions: Mail.Options = {
        from,
        to: toEmail,
        subject,
        html: html,// html body
        // attachments: [
        //     {
        //         // file on disk as an attachment 
        //         filename: 'README.md',
        //         // path: '@/README.md', // stream this file
        //         path: '/home/zukyo/Desktop/jobs/makeapp/README.md', // stream this file
        //     },
        // ]
    };

    transporter.sendMail(mailOptions, function (error, info: SMTPTransport.SentMessageInfo) {
        if (error) {
            throw new Error(error.message);
        } else {
            // console.log(info.accepted, info.rejected, info.pending);
            // console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return true;
        }
    });
}