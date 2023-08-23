import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
export async function POST(Request) {
    const {slug} = await Request.json();
    try {
        await connectToDb();
        const product = await Product.findOne({slug});
        const variants = await Product.find({title: product.title});
        let colorSizeSlug = {};

        for (const item of variants) {
            if (Object.keys(colorSizeSlug).includes(item.color)) {
                colorSizeSlug[item.color][item.size] = {slug: item.slug};
            }
            else{
                colorSizeSlug[item.color] = {};
                colorSizeSlug[item.color][item.size] = {slug: item.slug};
            }
        }
        return NextResponse.json({ product, variants: colorSizeSlug }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });

    }
}