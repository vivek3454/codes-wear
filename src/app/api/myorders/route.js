import connectToDb from "@/middleware/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import {verify} from "jsonwebtoken";
import { cookies } from "next/headers";


export async function POST(Request) {
    try {
        const token = cookies().get('codesWearJwt');
        if (!token) {   
            return NextResponse.json({ success: false, message: 'Not authorized' });
        }
        await connectToDb();
        // verifying jwt token
        const data = verify(token?.value, process.env.JWT_SECRET);
        // sending users orders in response
        let orders = await Order.find({email: data.email});
        return NextResponse.json({ success: true, orders });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}