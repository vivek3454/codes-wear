"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add, clear } from "@/redux/CartSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/helpers/axiosInstance";

const ProductDetailComponent = ({ data, slug }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [pin, setPin] = useState();
    const [servicebility, setServicebility] = useState();
    const [color, setColor] = useState(data?.product?.color);
    const [size, setSize] = useState(data?.product?.size);
    const [variants, setVariants] = useState(data.variants);
    const [product, setProduct] = useState(data.product);

    // function to set pin
    const onChangePin = (e) => {
        setPin(e.target.value);
    };

    const checkServicebility = async () => {
        let { data } = await axiosInstance.get("/api/user/pincode");
        if (Object.keys(data).includes(pin)) {
            setServicebility(true);
            toast.success("Your Pincode is serviceable!", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            setServicebility(false);
            toast.error("Sorry, Your Pincode is not serviceable!", {
                position: "bottom-center",
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

    const handleAddToCart = () => {
        dispatch(add({ name: product.title, price: product.price, slug: product.slug, qty: 1, size, color }));
        toast.success("Item added to Cart!", {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const refreshVariant = (newColor, newSize) => {
        let url = `${process.env.NEXT_PUBLIC_VERCEL_ENV}/pages/product/${variants[newColor][newSize]["slug"]}`;
        router.push(url);
    };

    const buyNow = () => {
        // clearing cart
        dispatch(clear());
        // adding in cart
        dispatch(add({ name: product.title, price: product.price, slug: product.slug, qty: 1, size, color }));
        router.push("/pages/checkout");
    };
    return (
        <div className="container px-5 py-14 mx-auto min-h-[90vh] flex items-center">
            {color && size && variants && product &&
                <div className="lg:w-4/5 w-full mx-auto flex justify-center lg:gap-20 flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/3 lg:max-h-[500px] w-96 object-contain object-top rounded" src={product.img} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}({product.size}/{product.color})</h1>
                        <div className="flex mb-4">
                        </div>
                        <p className="leading-relaxed">{product.desc}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex">
                                <span className="mr-3">Color</span>
                                {Object.keys(variants).includes("white") && Object.keys(variants["white"]).includes(size) && <button onClick={() => refreshVariant("white", size)} className={`border-2 ${color === "white" ? "border-black" : "border-gray-400"} bg-white rounded-full w-6 h-6 focus:outline-none`}></button>}
                                {Object.keys(variants).includes("black") && Object.keys(variants["black"]).includes(size) && <button onClick={() => refreshVariant("black", size)} className={`border-2 ${color === "black" ? "border-black" : "border-gray-400"} ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                                {Object.keys(variants).includes("red") && Object.keys(variants["red"]).includes(size) && <button onClick={() => refreshVariant("red", size)} className={`border-2 ${color === "red" ? "border-black" : "border-gray-400"} ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                {Object.keys(variants).includes("green") && Object.keys(variants["green"]).includes(size) && <button onClick={() => refreshVariant("green", size)} className={`border-2 ${color === "green" ? "border-black" : "border-gray-400"} ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                {Object.keys(variants).includes("blue") && Object.keys(variants["blue"]).includes(size) && <button onClick={() => refreshVariant("blue", size)} className={`border-2 ${color === "blue" ? "border-black" : "border-gray-400"} ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                                {Object.keys(variants).includes("orange") && Object.keys(variants["orange"]).includes(size) && <button onClick={() => refreshVariant("orange", size)} className={`border-2 ${color === "orange" ? "border-black" : "border-gray-400"} ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                            </div>
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">Size</span>
                                <div className="relative">
                                    <select value={size} onChange={(e) => refreshVariant(color, e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10">
                                        {variants[color] !== undefined && Object.keys(variants[color]).includes("S") && <option value={"S"}>S</option>}
                                        {variants[color] !== undefined && Object.keys(variants[color]).includes("M") && <option value={"M"}>M</option>}
                                        {variants[color] !== undefined && Object.keys(variants[color]).includes("L") && <option value={"L"}>L</option>}
                                        {variants[color] !== undefined && Object.keys(variants[color]).includes("XL") && <option value={"XL"}>XL</option>}
                                        {variants[color] !== undefined && Object.keys(variants[color]).includes("XXL") && <option value={"XXL"}>XXL</option>}
                                    </select>
                                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            {product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>}
                            {product.availableQty <= 0 && <span className="title-font font-medium text-xl text-red-800">Out of Stock!</span>}
                            <button disabled={product.availableQty <= 0} onClick={() => buyNow()} className="flex ml-4 text-white bg-red-500 disabled:bg-red-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
                            <button disabled={product.availableQty <= 0} onClick={handleAddToCart} className="flex ml-2 text-white bg-red-500 disabled:bg-red-300 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-red-600 rounded">Add to Cart</button>
                        </div>
                        <div className="mt-5 flex space-x-2">
                            <input type="text" placeholder="Enter your pincode" onChange={onChangePin} value={pin} className="px-2 border-2 border-gray-400 outline-none focus:border-red-500 rounded" />
                            <button onClick={checkServicebility} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Check</button>
                        </div>
                        {(!servicebility && servicebility != null) && <div className="text-red-600 text-sm">We do not deliver to this pincode</div>}
                        {servicebility && <div className="text-green-600 text-sm">Yay! This pincode is serviceable</div>}
                    </div>
                </div>
            }
        </div>
    );
};

export default ProductDetailComponent;