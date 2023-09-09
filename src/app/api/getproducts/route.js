import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function GET(Request) {
    try {
        await connectToDb();
        // get all products
        const products = await Product.find();
        return NextResponse.json({ products }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}