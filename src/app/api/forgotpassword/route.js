import { NextResponse } from "next/server";
import User from "@/models/User";
import Forgot from "@/models/Forgot";
import { createTransport } from "nodemailer";
import CryptoJS from "crypto-js";

export async function POST(Request) {
    try {
        const req = await Request.json();
        if (req?.sendMail) {
            const user = await User.findOne({ email: req?.email });
            if (!user) {
                return NextResponse.json({ success: false, message: "User does not exist" }, { status: 404 });
            }
            // function to generate token
            let str = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}|;':,.<>?/abcdefghijklmnopqrstuvwxyz";
            let token;
            const generateToken = ()=>{
                for (let i = 0; i < 23; i++) {
                    const randomNum = Math.floor(Math.random() * str.length) + 1;
                    token += str[randomNum];
                }
            };
            generateToken();
            let forgot = new Forgot({
                email: req?.email,
                token
            });
            const subject = "Reset Password";
            const message = `
                Hi ${user.name},
        
                There was a request to change your password!
        
                If you did not make this request then please ignore this email.
        
                Otherwise, please click this link to change your password: <a href="http://localhost:3000/forgot?token=${token}">reset password</a>
            `;
            // create transporter object using the default SMTP transport
            let transporter = createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            // send mail with defined transport object
            await transporter.sendMail({
                from: process.env.SMTP_FROM_EMAIL, // sender address
                to: req?.email, // user email
                subject: subject, // Subject line
                html: message, // html body
            });
            await forgot.save();

            return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
        }
        else {
            const user = await Forgot.find({ token: req.token });
            if (!user.token === req.token) {
                return NextResponse.json({ success: false, message: "Can not change password. Please try again" }, { status: 400 });
            }
            await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.newPassword, process.env.AES_SECRET).toString() });
            return NextResponse.json({ success: true, message: "Password changed successfully" }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}