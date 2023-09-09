import connectToDb from "@/middleware/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(Request) {
    try {
        const { email, checkoutAmount, items, address, phone } = await Request.json();
        // checking if cart tampered
        let subTotal = 0;
        for (const item of items) {
            let product = await Product.findOne({ slug: item.slug });
            subTotal += item.price * item.qty;
            if (product.availableQty < item.qty) {
                return NextResponse.json({ success: false, message: 'Some items in your cart went out of stock. Please try again', isClear: true }, { status: 400 });
            }
            if (product.price !== item.price) {
                return NextResponse.json({ success: false, message: 'The price of some items in your cart have changed. Please try again', isClear: true }, { status: 400 });
            }
        }
        if (subTotal !== checkoutAmount) {
            return NextResponse.json({ success: false, message: 'The price of some items in your cart have changed. Please try again', isClear: true }, { status: 400 });
        }
        // validating phone number
        if (phone.length !== 10) {
            return NextResponse.json({ success: false, message: 'Please enter your 10 digit phone number.', isClear: false }, {status: 400});
        }

        await connectToDb();
        // creating razorpay payment order
        const instance = new Razorpay({ key_id: `${process.env.RAZORPAY_KEY_ID}`, key_secret: `${process.env.RAZORPAY_KEY_SECRET}` })
        const order = await instance.orders.create({
            amount: Number(checkoutAmount * 100),
            currency: "INR"
        })
        // storing order details in database
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
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}