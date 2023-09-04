import connectToDb from "@/middleware/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(Request) {
    // const data = await Request.json();
    const {name,email, password} = await Request.json();
    await connectToDb();
    const userExist = await User.findOne({email});
    if (userExist) {
        return NextResponse.json({success: false, message: 'email already exist'});
    }
    const user = User.create({name, email,password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString() });
    return NextResponse.json({success: true, user: {name:user.name,email: user.email}});
}