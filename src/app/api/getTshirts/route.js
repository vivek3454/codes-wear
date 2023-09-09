import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function GET(Request) {

    try {
        await connectToDb();
        // get category: tshirts data from database , iterate through and store in tshirts object
        const products = await Product.find({ category: 'tshirts' });
        let tshirts = {};
        for (const product of products) {
            if (product.title in tshirts) {
                if (!tshirts[product.title].color.includes(product.color) && product.availableQty > 0) {
                    tshirts[product.title].color.push(product.color);
                }
                if (!tshirts[product.title].size.includes(product.size) && product.availableQty > 0) {
                    tshirts[product.title].size.push(product.size);
                }
            }
            else {
                tshirts[product.title] = JSON.parse(JSON.stringify(product));
                if (product.availableQty > 0) {
                    tshirts[product.title].color = [product.color];
                    tshirts[product.title].size = [product.size];
                }
                else {
                    tshirts[product.title].color = [];
                    tshirts[product.title].size = [];
                }
            }
        }
        return NextResponse.json({ tshirts }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}