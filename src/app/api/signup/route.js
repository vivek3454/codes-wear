import connectToDb from "@/middleware/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(Request) {
    try {

        const { name, email, password } = await Request.json();
        await connectToDb();
        const userExist = await User.findOne({ email });
        if (userExist) {
            return NextResponse.json({ success: false, message: "email already exist" }, { status: 409 });
        }
        // creating user in database
        const user = User.create({ name, email, password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString() });
        return NextResponse.json({ success: true, user: { name: user.name, email: user.email } }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}