import ProductCard from "@/components/ProductCard";
import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import React from "react";

const getAllhoodies = async () => {
  try {
    await connectToDb();
    const products = await Product.find({ category: "Hoodie" });
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
    return hoodies;

  } catch (error) {
    console.log(error.message);

  }
};

const Hoodies = async () => {
  // getting all hoodies and storing in state
    const hoodies = await getAllhoodies();

  return (
    <section className="text-gray-600 container mx-auto">
      <div className="px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -m-4">
          {Object.keys(hoodies).map((product, i) => (
            <ProductCard key={i} {...hoodies[product]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hoodies;