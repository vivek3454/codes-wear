import Link from "next/link";
import React from "react";

const ProductCard = ({ slug, img, title, color, size, price, category }) => {
    return (
        <Link href={`/pages/product/${slug}`} className="shadow-xl hover:shadow m-2 rounded">
            <div className="w-60 m-2 p-2">
                <div className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className="object-contain object-center w-full h-[35vh] block" src={img} />
                </div>
                <div className="mt-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-gray-900 title-font text-lg font-bold">{title}</h2>
                        <h3 className="text-gray-500 text-xs tracking-widest font-bold title-font mb-1">{category}</h3>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="mt-1 flex gap-1">
                                {color.includes("red") && <button className="border-2 border-gray-300 bg-red-500 rounded-full w-4 h-4 focus:outline-none"></button>}
                                {color.includes("blue") && <button className="border-2 border-gray-300 bg-blue-500 rounded-full w-4 h-4 focus:outline-none"></button>}
                                {color.includes("black") && <button className="border-2 border-gray-300 bg-black rounded-full w-4 h-4 focus:outline-none"></button>}
                                {color.includes("green") && <button className="border-2 border-gray-300 bg-green-500 rounded-full w-4 h-4 focus:outline-none"></button>}
                                {color.includes("orange") && <button className="border-2 border-gray-300 bg-orange-500 rounded-full w-4 h-4 focus:outline-none"></button>}
                            </div>
                            <div className="mt-3">
                                {size.includes("S") && <span className="text-sm border border-gray-400 mr-1 px-1 py-1">S</span>}
                                {size.includes("M") && <span className="text-sm border border-gray-400 mr-1 px-1 py-1">M</span>}
                                {size.includes("L") && <span className="text-sm border border-gray-400 mr-1 px-1 py-1">L</span>}
                                {size.includes("XL") && <span className="text-sm border border-gray-400 mr-1 px-1 py-1">XL</span>}
                                {size.includes("XXL") && <span className="text-sm border border-gray-400 mr-1 px-1 py-1">XXL</span>}
                            </div>
                        </div>
                        <p className="mt-1">₹{price}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;