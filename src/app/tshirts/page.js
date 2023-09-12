"use client";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const Tshirts = () => {
  const [tshirts, setTshirts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // getting all tshirts and storing in state
  useEffect(() => {
    const getAlltshirts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getTshirts`);
        const data = await res.json();
        setTshirts(data.tshirts);
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
    getAlltshirts();
  }, []);

  return (
    <section className="text-gray-600 container mx-auto">
      <Head>
        <title>Tshirt - CodesWear.com</title>
      </Head>
      <div className="px-5 py-24  mx-auto">
        {Object.keys(tshirts).length === 0 && isLoading && <Loading />}
        {Object.keys(tshirts).length === 0 && !isLoading &&
          <div className="text-xl font-semibold h-[70vh] flex justify-center items-center">
            Currently tshirts are not available
          </div>}
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