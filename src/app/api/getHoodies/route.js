import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function GET(Request) {
    
    try {
        await connectToDb();
        const products = await Product.find({ category: "hoodies" });
        // get category: hoodies data from database , iterate through and store in hoodies object
        let hoodies = {};
        for (const product of products) {
            if (product.title in hoodies) {
                if (!hoodies[product.title].color.includes(product.color) && product.availableQty > 0) {
                    hoodies[product.title].color.push(product.color);
                }
                if (!hoodies[product.title].size.includes(product.size) && product.availableQty > 0) {
                    hoodies[product.title].size.push(product.size);
                }
            }
            else {
                if (product.availableQty > 0) {
                    hoodies[product.title] = JSON.parse(JSON.stringify(product));
                }
                if (product.availableQty > 0) {
                    hoodies[product.title].color = [product.color];
                    hoodies[product.title].size = [product.size];
                }
            }
        }
        return NextResponse.json({ hoodies }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}