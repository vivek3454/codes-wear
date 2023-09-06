import connectToDb from "@/middleware/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(Request) {
    try {
        const { email, checkoutAmount, items, address } = await Request.json();
        let subTotal = 0;
        for (const item of items) {
            let product = await Product.findOne({slug: item.slug});
                subTotal += item.price * item.qty;
            if (product.price !== item.price) {
                return NextResponse.json({ success: false, message: 'The price of some products in your cart have changed. Please try again' }, {status: 400});
            }
        }
        if (subTotal !== checkoutAmount) {
            return NextResponse.json({ success: false, message: 'The price of some products in your cart have changed. Please try again' }, {status:400});
        }
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
        return NextResponse.json({ success: false, message: error.message },{status: 500});
    }
}