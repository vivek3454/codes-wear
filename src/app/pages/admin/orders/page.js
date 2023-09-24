import connectToDb from "@/config/db";
import Order from "@/models/Order";
import Link from "next/link";
import React from "react";

const getAllOrders = async () => {
  await connectToDb();
  const orders = await Order.find({status: "Paid"});
  return orders;
};

const Orders = async () => {
  const orders = await getAllOrders();
  return (
    <div className="p-5">
      <h1 className="text-center text-2xl font-semibold my-5">All Orders</h1>
      {orders?.length > 0 && <div className="relative overflow-x-auto pt-6 flex flex-col gap-2">
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
                Delivery <br /> Status
              </th>
              <th scope="col" className="px-6 py-3">
                Address
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
                  {order.deliveryStatus}
                </td>
                <td className="px-6 py-4 ">
                 {order.address}, {order.district}, {order.state}, {order.pincode}
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