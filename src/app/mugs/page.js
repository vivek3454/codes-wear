import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import axios from "axios";
import React from "react";

let loading = true;
const getMugs = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getMugs`);
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

const Mugs = async () => {
  // getting all mugs and storing in state
  const { mugs } = await getMugs();

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