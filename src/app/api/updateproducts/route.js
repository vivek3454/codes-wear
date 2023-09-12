import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function POST(Request) {
    const data = await Request.json();
    try {
        await connectToDb();
        // updating product
        for (const product of data) {
            let p = await Product.findByIdAndUpdate({ _id: product._id,},{
                title: product.title,
                slug: product.slug,
                desc: product.desc,
                img: product.img,
                category: product.category,
                size: product.size,
                color: product.color,
                price: product.price,
                availableQty: product.availableQty,
            });
        }
        
        return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}