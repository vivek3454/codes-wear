import ProductCard from "@/components/ProductCard";
import connectToDb from "@/middleware/db";
import Product from "@/models/Product";
import React from "react";

const getMugs = async () => {
  try {
    await connectToDb();
    // get category: mugs data from database , iterate through and store in mugs object
    const products = await Product.find({ category: "Mug" });
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
    return mugs;

  } catch (error) {
    console.log(error.message);

  }
};

const Mugs = async () => {
  // getting all mugs and storing in state
  const mugs = await getMugs();

  return (
    <section className="text-gray-600 container mx-auto">
      {<div className="px-5 py-24 mx-auto">
        {Object.keys(mugs).length > 0 &&
          <div className="flex flex-wrap justify-center items-center -m-4">
            {Object.keys(mugs).map((product, i) => (
              <ProductCard key={i} {...mugs[product]} />
            ))}
          </div>
        }
      </div>}
    </section>
  );
};

export default Mugs;