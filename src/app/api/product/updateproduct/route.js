import connectToDb from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function PUT(Request) {
    try {
        const data = await Request.json();
        await connectToDb();
        // updating product
        await Product.findByIdAndUpdate({ _id: data._id, }, {
            title: data.title, slug: data.slug,
            desc: data.desc,
            img: data.img,
            price: data.price,
            availableQty: data.availableQty,
        });

        return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}