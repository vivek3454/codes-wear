import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function GET(Request) {

    try {
        await connectToDb();
        // get category: mugs data from database , iterate through and store in mugs object
        const products = await Product.find({category: "mugs"});
        let mugs = {};
        for (const product of products) {
            if (product.title in mugs) {
                if (!mugs[product.title].color.includes(product.color) && product.availableQty > 0) {
                    mugs[product.title].color.push(product.color);
                }
                if (!mugs[product.title].size.includes(product.size) && product.availableQty > 0) {
                    mugs[product.title].size.push(product.size);
                }
            }
            else {
                if (product.availableQty > 0) {
                    mugs[product.title] = JSON.parse(JSON.stringify(product));
                }
                if (product.availableQty > 0) {
                    mugs[product.title].color = [product.color];
                    mugs[product.title].size = [product.size];
                }
            }
        }
        return NextResponse.json({ mugs }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}