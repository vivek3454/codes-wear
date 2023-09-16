import React from "react";
import Loading from "@/components/Loading";
import ProductDetailComponent from "@/components/ProductDetailComponent";
import axiosInstance from "@/helpers/axiosInstance";

let loading = true;
const getProduct = async (slug) => {
  const { data } = await axiosInstance.post("/api/getproduct", { slug });
  return data;
};

const ProductDetail = async (params) => {
  const slug = params?.params?.slug;
  const data = await getProduct(slug);
  loading = false;

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <ProductDetailComponent data={data} slug={slug} loading={loading} />
      {loading && <Loading />}
    </section>
  );
};

export default ProductDetail;