import connectToDb from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(Request) {
    try {
        const { email, password } = await Request.json();
        await connectToDb();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: "email is not existed" }, { status: 404 });
        }
        // decrypting password
        const originalText = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8);
        if (password === originalText) {
            // generating jwt token
            const token = sign({ name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2d" });
            const cookieOption = {
                maxAge: 7 * 24 * 60 * 60,
                httpOnly: true
            };
            cookies().set("codesWearJwt", token, cookieOption);
            return NextResponse.json({ success: true, user }, { status: 200 });
        }
        else {
            return NextResponse.json({ success: false, message: "please enter correct password" }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}