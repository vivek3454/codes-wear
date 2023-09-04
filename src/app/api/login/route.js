import connectToDb from "@/middleware/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
import { sign } from "jsonwebtoken";

export async function POST(Request) {
    try {
        const { email, password } = await Request.json();
        await connectToDb();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: 'email is not existed' });
        }
        const originalText = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)
        if (password === originalText) {
            const token = sign({ name: user.name, email: user.email }, process.env.JWT_SECRET, {expiresIn: '2d'})
            return NextResponse.json({ success: true, token });
        }
        else {
            return NextResponse.json({ success: false, message: 'please enter correct password' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}