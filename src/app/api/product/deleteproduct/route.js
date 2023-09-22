import connectToDb from "@/config/db";
import Product from "@/models/Product";
import qs from "querystring";
import { NextResponse } from "next/server";
export async function DELETE(Request) {
    try {
        await connectToDb();
        const rawParams = Request.url.split("?")[1];
        const { id } = qs.parse(rawParams);

        // delete product from database
        const product = await Product.findByIdAndDelete({ _id: id });

        return NextResponse.json({ message: "Product deleted Successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}