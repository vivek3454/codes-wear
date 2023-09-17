import React from "react";
import ProductDetailComponent from "@/components/ProductDetailComponent";
import Product from "@/models/Product";
import connectToDb from "@/config/db";

const getProduct = async (slug) => {
  try {
    await connectToDb();
    const product = await Product.findOne({ slug });
    const variants = await Product.find({ title: product.title, category: product.category });
    let colorSizeSlug = {};

    for (const item of variants) {
      if (Object.keys(colorSizeSlug).includes(item.color)) {
        colorSizeSlug[item.color][item.size] = { slug: item.slug };
      }
      else {
        colorSizeSlug[item.color] = {};
        colorSizeSlug[item.color][item.size] = { slug: item.slug };
      }
    }
    const obj = { product, variants: colorSizeSlug };
    return obj;

  } catch (error) {
    console.log(error.message);
  }
};

const ProductDetail = async (params) => {
  const slug = params?.params?.slug;
  const data = await getProduct(slug);

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ProductDetailComponent data={data} slug={slug} />
    </section>
  );
};

export default ProductDetail;