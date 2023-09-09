import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function POST(Request) {
    const data = await Request.json();
    try {
        await connectToDb();
        // adding product in database
        for (const product of data) {
            let p = new Product({
                title: product.title,
                slug: product.slug,
                desc: product.desc,
                img: product.img,
                category: product.category,
                size: product.size,
                color: product.color,
                price: product.price,
                availableQty: product.availableQty,
            })
            await p.save()
        }
        
        return NextResponse.json({ message: 'Product added successfully' }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}