import ProductCard from "@/components/ProductCard";
import axios from "axios";
import React from "react";
import Loading from "@/components/Loading";

let loading = true;
const getAlltshirts = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getTshirts`);
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

const Tshirts = async () => {
  // getting all tshirts and storing in state
  const {tshirts} = await  getAlltshirts();

  return (
    <section className="text-gray-600 container mx-auto">
       <div className="px-5 py-24  mx-auto">
            {Object.keys(tshirts).length === 0 && loading && <Loading />}
            {Object.keys(tshirts).length === 0 && !loading &&
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