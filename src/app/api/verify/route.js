import connectToDb from "@/middleware/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import crypto from "crypto";
import Product from "@/models/Product";

export async function POST(Request) {
    try {
        await connectToDb();
        const { response: { razorpay_order_id, razorpay_payment_id, razorpay_signature }, id } = await Request.json();
        const text = razorpay_order_id + "|" + razorpay_payment_id;
        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(text.toString())
            .digest('hex');
        if (generated_signature === razorpay_signature) {
            const order = await Order.findByIdAndUpdate(id, {
                paymentInfo: {
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature
                },
                status: 'Paid'
            })
            for (const product of order.products) {
                await Product.findOneAndUpdate({slug: product.slug}, {$inc: {availableQty: - product.qty}})
            }
            return NextResponse.json({ success: true, message: 'payment is successful' });
        }
        else {
            return NextResponse.json({ success: false });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}