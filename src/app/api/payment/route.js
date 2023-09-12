import connectToDb from "@/middleware/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import pincodes from "../../../data/pincodes";

export async function POST(Request) {
    try {
        const { name, email, checkoutAmount, items, address, phone, pincode, district, state } = await Request.json();

        // checking pincode is serviceable or not
        if (!Object.keys(pincodes).includes(pincode)) {
            return NextResponse.json({ success: false, message: "Sorry! This pincode is not serviceable. Please try again", isClear: false }, { status: 422 });
        }

        // checking if cart tampered
        let subTotal = 0;
        for (const item of items) {
            let product = await Product.findOne({ slug: item.slug });
            subTotal += item.price * item.qty;
            if (product.availableQty < item.qty) {
                return NextResponse.json({ success: false, message: "Some items in your cart went out of stock. Please try again", isClear: true }, { status: 422 });
            }
            if (product.price !== item.price) {
                return NextResponse.json({ success: false, message: "The price of some items in your cart have changed. Please try again", isClear: true }, { status: 422 });
            }
        }
        if (subTotal !== checkoutAmount) {
            return NextResponse.json({ success: false, message: "The price of some items in your cart have changed. Please try again", isClear: true }, { status: 422 });
        }
        // validating phone number
        if (phone.length !== 10) {
            return NextResponse.json({ success: false, message: "Please enter your 10 digit phone number.", isClear: false }, { status: 400 });
        }

        await connectToDb();
        // creating razorpay payment order
        const instance = new Razorpay({ key_id: `${process.env.RAZORPAY_KEY_ID}`, key_secret: `${process.env.RAZORPAY_KEY_SECRET}` });
        const order = await instance.orders.create({
            amount: Number(checkoutAmount * 100),
            currency: "INR"
        });
        // storing order details in database
        let myorder = new Order({
            email,
            orderId: order.id,
            products: items,
            paymentInfo: {
                razorpay_order_id: "",
                razorpay_payment_id: "",
                razorpay_signature: ""
            },
            address,
            district,
            state,
            name,
            pincode,
            checkoutAmount,
        });
        await myorder.save();
        return NextResponse.json({ success: true, order, id: myorder._id }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}