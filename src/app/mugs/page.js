"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Mugs = () => {
  const [mugs, setMugs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // getting all mugs and storing in state
  useEffect(() => {
    const getMugs = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getMugs`);
        setMugs(res?.data?.mugs);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message, {
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
    getMugs();
  }, []);

  return (
    <section className="text-gray-600 container mx-auto">
      {<div className="px-5 py-24 mx-auto">
        {Object.keys(mugs).length === 0 && isLoading && <Loading />}
        {Object.keys(mugs).length === 0 && !isLoading &&
          <div className="text-xl font-semibold h-[70vh] flex justify-center items-center">
            Currently mugs are not available
          </div>}
        {Object.keys(mugs).length > 0 && <div className="flex flex-wrap justify-center -m-4">
          {Object.keys(mugs).map((product, i) => (

            <Link key={i} href={`/product/${mugs[product].slug}`} className="shadow-xl hover:shadow m-2 rounded">
              <div className="w-60 m-2 p-2">
                <div className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="object-contain object-center w-full h-[35vh] block" src={mugs[product].img} />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-gray-900 title-font text-lg font-bold">{mugs[product].title}</h2>
                    <h3 className="text-gray-500 text-xs tracking-widest font-bold title-font mb-1">Tshirt</h3>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="mt-1 flex gap-1">
                        {mugs[product].color.includes("red") && <button className="border-2 border-gray-300 bg-red-500 rounded-full w-4 h-4 focus:outline-none"></button>}
                        {mugs[product].color.includes("blue") && <button className="border-2 border-gray-300 bg-blue-500 rounded-full w-4 h-4 focus:outline-none"></button>}
                        {mugs[product].color.includes("black") && <button className="border-2 border-gray-300 bg-black rounded-full w-4 h-4 focus:outline-none"></button>}
                        {mugs[product].color.includes("green") && <button className="border-2 border-gray-300 bg-green-500 rounded-full w-4 h-4 focus:outline-none"></button>}
                        {mugs[product].color.includes("orange") && <button className="border-2 border-gray-300 bg-orange-500 rounded-full w-4 h-4 focus:outline-none"></button>}
                      </div>
                      <div className="mt-3">
                        {mugs[product].size.includes("S") && <span className="text-sm border border-gray-400 mr-1 px-1 py-1">S</span>}
                        {mugs[product].size.includes("M") && <span className="text-sm border border-gray-400 mx-1 px-1 py-1">M</span>}
                        {mugs[product].size.includes("L") && <span className="text-sm border border-gray-400 mx-1 px-1 py-1">L</span>}
                        {mugs[product].size.includes("XL") && <span className="text-sm border border-gray-400 mx-1 px-1 py-1">XL</span>}
                        {mugs[product].size.includes("XXL") && <span className="text-sm border border-gray-400 mx-1 px-1 py-1">XXL</span>}
                      </div>
                    </div>
                    <p className="mt-1">₹{mugs[product].price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>}
      </div>}
    </section>
  );
};

export default Mugs;