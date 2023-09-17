import ProductCard from "@/components/ProductCard";
import connectToDb from "@/config/db";
import Product from "@/models/Product";
import React from "react";

export const dynamic = "force-dynamic";

const getAlltshirts = async () => {
  try {
    await connectToDb();
    // get category: tshirts data from database , iterate through and store in tshirts object
    const products = await Product.find({ category: "Tshirt" });
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
    return tshirts;

  } catch (error) {
    console.log(error.message);

  }
};

const Tshirts = async () => {
  // getting all tshirts and storing in state
  const tshirts = await  getAlltshirts();

  return (
    <section className="text-gray-600 container mx-auto">
       <div className="px-5 py-24  mx-auto">
        {Object.keys(tshirts).length === 0 && <div className="h-[60vh] flex justify-center items-center text-lg font-semibold">No Tshirts</div>}
            {Object.keys(tshirts).length > 0 && <div className="flex flex-wrap justify-center -m-4">
                {Object.keys(tshirts).map((product, i) => (
                    <ProductCard key={i} {...tshirts[product]} />
                ))}
            </div>}
        </div>
    </section>
  );
};

export default Tshirts;