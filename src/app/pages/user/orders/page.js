"use client";
import Loading from "@/components/Loading";
import axiosInstance from "@/helpers/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // function to fetch users all orders
    const fetchOrders = async () => {
      try {
        let { data } = await axiosInstance.get("/api/user/myorders");
        setLoading(false);
        if (!data?.success) {
          router.push("/");
          toast.error(data?.message, {
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
        else {
          setOrders(data?.orders);
        }
      } catch (error) {
        setLoading(false);
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

    fetchOrders();
  }, []);
  return (
    <div className="container mx-auto px-5 min-h-[86vh]">
      <h1 className="font-bold text-xl py-10 px-2 text-center">My Orders</h1>
      {orders.length === 0 && loading && <Loading />}
      {orders.length === 0 && !loading && <div className="h-[70vh] flex justify-center items-center">No Orders</div>}
      {orders.length > 0 && <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order, i) => (
              <tr key={i} className="bg-white border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.orderId}
                </th>
                <td className="px-6 py-4">
                  {order.email}
                </td>
                <td className="px-6 py-4">
                  {order.checkoutAmount}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/pages/user/order?id=${order.orderId}`}>Detail</Link>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>}

    </div>
  );
};

export default Orders;