import connectToDb from "@/middleware/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(Request) {
    // const data = await Request.json();
    const {name,email, password} = await Request.json();
    await connectToDb();
    const user = User.create({name, email,password });
    return NextResponse.json({success: true, user: data});
}