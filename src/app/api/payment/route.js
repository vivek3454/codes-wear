import connectToDb from "@/middleware/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(Request) {
    const {amount} = await Request.json();
    await connectToDb();
    const instance = new Razorpay({ key_id: `${process.env.RAZORPAY_KEY_ID}`, key_secret: `${process.env.RAZORPAY_KEY_SECRET}` })
    const order = await instance.orders.create({
        amount: Number(amount * 100),
        currency: "INR"
    })
    return NextResponse.json({ success: true, order });
}