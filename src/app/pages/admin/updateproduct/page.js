"use client";
import axiosInstance from "@/helpers/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProduct = ({ searchParams }) => {
    const [product, setProduct] = useState({ title: searchParams.title, slug: searchParams.slug, desc: searchParams.desc, img: searchParams.img, category: searchParams.category, size: searchParams.size, color: searchParams.color, price: searchParams.price, availableQty: searchParams.availableQty });
    const router = useRouter();

    const handleOnchange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const res = axiosInstance.put("/api/product/updateproduct", { ...product, _id: searchParams._id });
            toast.promise(res, {
                pending: "Updating...",
                success: `${product.title} Updated Successfully`,
                error: "Not Updated. Try again"
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
            router.push("/pages/admin/allproducts");
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

    return (
        <div className="p-5">
            <h1 className="text-center font-semibold text-2xl my-10">Update Product</h1>
            <form onSubmit={handleUpdateProduct} className="shadow-[0px_0px_40px] rounded-md shadow-gray-300 p-5 mx-auto max-w-md flex flex-col gap-5 items-center">
                <div className="flex flex-col w-full">
                    <label htmlFor="title">Title</label>
                    <input onChange={handleOnchange} value={product.title} type="text" className="w-full h-8 rounded outline-none border-2 border-gray-500 px-2" name="title" id="title" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="slug">Slug</label>
                    <input onChange={handleOnchange} value={product.slug} type="text" className="w-full h-8 rounded outline-none border-2 border-gray-500 px-2" name="slug" id="slug" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="desc">Description</label>
                    <textarea onChange={handleOnchange} value={product.desc} type="text" className="w-full h-28 resize-none py-2 rounded outline-none border-2 border-gray-500 px-2" name="desc" id="desc" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="img">Image</label>
                    <input onChange={handleOnchange} value={product.img} type="text" className="w-full h-8 rounded outline-none border-2 border-gray-500 px-2" name="img" id="img" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="category">Category</label>
                    <select onChange={handleOnchange} defaultValue={product.category} className="outline-none border-2 border-gray-500 rounded h-8" name="category" id="category">
                        <option value="Tshirt">Tshirt</option>
                        <option value="Hoodie">Hoodie</option>
                        <option value="Mug">Mug</option>
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="size">Size</label>
                    <select onChange={handleOnchange} defaultValue={product.size} className="outline-none border-2 border-gray-500 rounded h-8" name="size" id="size">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="color">Color</label>
                    <select onChange={handleOnchange} defaultValue={product.color} className="outline-none border-2 border-gray-500 rounded h-8" name="color" id="color">
                        <option value="red">Red</option>
                        <option value="orange">Orange</option>
                        <option value="black">Black</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="price">Price</label>
                    <input onChange={handleOnchange} value={product.price} type="number" className="w-full h-8 rounded outline-none border-2 border-gray-500 px-2" name="price" id="price" />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="availableQty">Available Quantity</label>
                    <input onChange={handleOnchange} value={product.availableQty} type="number" className="w-full h-8 rounded outline-none border-2 border-gray-500 px-2" name="availableQty" id="availableQty" />
                </div>
                <div className="flex justify-center w-full">
                    <button className="bg-red-500 hover:bg-red-400 px-2 py-1 rounded">Update Product</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProduct;