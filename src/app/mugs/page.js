"use client";
import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
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