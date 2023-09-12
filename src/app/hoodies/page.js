"use client";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Hoodies = () => {
  const [hoodies, setHoodies] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // getting all hoodies and storing in state
  useEffect(() => {
    const getAllhoodies = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getHoodies`);
        setHoodies(res.data.hoodies);
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
    getAllhoodies();
  }, []);

  return (
    <section className="text-gray-600 container mx-auto">
      <div className="px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -m-4">
          {Object.keys(hoodies).length === 0 && isLoading && <Loading />}
          {Object.keys(hoodies).length === 0 && !isLoading &&
            <div className="text-xl font-semibold h-[70vh] flex justify-center items-center">
              Currently hoodies are not available
            </div>}
          {Object.keys(hoodies).map((product, i) => (
            <ProductCard key={i} {...hoodies[product]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hoodies;