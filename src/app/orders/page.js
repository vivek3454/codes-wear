'use client';
import Loading from '@/components/Loading';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// import { cookies } from 'next/headers';

const Orders = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      let { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`);
      if (!data.success) {
        router.push('/');
        toast.error(data.message, {
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
        setOrders(data.orders);
      }
    }

    fetchOrders();
  }, [])
  return (
    <div className='container mx-auto px-5 min-h-[86vh]'>
      <h1 className='font-bold text-xl py-10 px-2 text-center'>My Orders</h1>
    {orders.length === 0 && <Loading />}
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
                  {order.paymentInfo.razorpay_order_id}
                </th>
                <td className="px-6 py-4">
                  {order.email}
                </td>
                <td className="px-6 py-4">
                  {order.checkoutAmount}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/order?id=${order.paymentInfo.razorpay_order_id}`}>Detail</Link>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>}

    </div>
  )
}

export default Orders