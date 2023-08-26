import connectToDb from "@/middleware/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(Request) {
    // const data = await Request.json();
    try {
        const { email, password } = await Request.json();
        await connectToDb();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, message: 'email is not existed' });
        }
        if (email === user.email && password === user.password) {
            return NextResponse.json({ success: true, name: user.name, email });
        }
        else{
            return NextResponse.json({ success: false, message: 'please enter correct password' });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}