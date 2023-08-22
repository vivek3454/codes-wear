import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function GET(Request) {
    let color = ['blue', 'black', 'green', 'orange']
    let size = ['L', 'XL', 'M', 'S', 'XXL']
    try {
        await connectToDb();
        const products = await Product.find();
        let tshirts = {};
        for (const product of products) {
            if (product.slug in tshirts) {
                if (!tshirts[product.slug].color.includes(product.color) && product.availableQty > 0) {
                    tshirts[product.slug].color.push(product.color);
                }
                if (!tshirts[product.slug].size.includes(product.size) && product.availableQty > 0) {
                    tshirts[product.slug].size.push(product.size);
                }
            }
            else {
                tshirts[product.slug] = JSON.parse(JSON.stringify(product));
                if (product.availableQty > 0) {
                    tshirts[product.slug].color = [product.color,...color];
                    tshirts[product.slug].size = [product.size, ...size];
                }
            }
        }
        return NextResponse.json({ tshirts }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}