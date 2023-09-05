import connectToDb from "@/middleware/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(Request) {
    try {

        const { email, checkoutAmount, items, address } = await Request.json();
        await connectToDb();
        const instance = new Razorpay({ key_id: `${process.env.RAZORPAY_KEY_ID}`, key_secret: `${process.env.RAZORPAY_KEY_SECRET}` })
        const order = await instance.orders.create({
            amount: Number(checkoutAmount * 100),
            currency: "INR"
        })
        let myorder = new Order({
            email,
            orderId: order.id,
            products: items,
            paymentInfo: {
                razorpay_order_id: '',
                razorpay_payment_id: '',
                razorpay_signature: ''
            },
            address,
            checkoutAmount,
        });
        await myorder.save();
        return NextResponse.json({ success: true, order, id: myorder._id });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}