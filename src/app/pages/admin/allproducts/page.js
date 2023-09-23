"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "@/helpers/axiosInstance";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getAllProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/api/product/getproducts");
      setProducts(data.products);
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handlDelete = async (id, title) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        const res = axiosInstance.delete(`/api/product/deleteproduct?id=${id}`);
        toast.promise(res, {
          pending: "Deleting...",
          success: `${title} Deleted Successfully`,
          error: "Not Deleted. Try again"
        },
          {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        getAllProducts();
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }

  };

  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-semibold my-10">All Products</h1>
      {products.length === 0 && <Loading />}
      {products.length > 0 && <div className="flex flex-wrap justify-center -m-4">
        {products.map((product, i) => (
          <div key={i} className="shadow m-2 rounded">
            <div className="w-60 m-2 p-2">
              <div className="block relative rounded overflow-hidden">
                <img alt="ecommerce" className="object-contain object-center w-full h-[35vh] block" src={product.img} />
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-gray-900 title-font text-lg font-bold">{product.title}</h2>
                  <h3 className="text-gray-500 text-xs tracking-widest font-bold title-font mb-1">{product.category}</h3>
                </div>
                <div className="flex justify-between">
                  <div className="mt-1 flex flex-col gap-2">
                    <button className={`border-2 border-gray-300 bg-${product.color}-500 rounded-full w-4 h-4 focus:outline-none`}></button>
                    <span className="text-sm border border-gray-400 mr-1 px-1 py-1">{product.size}</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="mt-1">₹{product.price}</p>
                    <div className="flex gap-4 items-center">
                      <Link href={{ pathname: "/pages/admin/updateproduct", query: product }} className="text-lg"><FaEdit /></Link>
                      <button onClick={() => handlDelete(product._id, product.title)} ><FaTrash /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>}
    </div>
  );
};

export default AllProducts;