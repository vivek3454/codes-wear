import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import React from "react";

let loading = true;
const getAllhoodies = async () => {
  try {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getHoodies`);
    loading = false;
    return data;
  } catch (error) {
    loading = false;
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

const Hoodies = async () => {
  // getting all hoodies and storing in state
    const {hoodies} = await getAllhoodies();

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