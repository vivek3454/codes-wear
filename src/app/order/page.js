import connectToDb from '@/middleware/db'
import Order from '@/models/Order'
import React from 'react'

const MyOrder = async ({ searchParams }) => {
  const [order] = await fetchSingleOrder(searchParams?.id);
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="px-5 py-24">
        <div className="lg:w-4/5 mx-auto flex justify-between flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CodesWear.com</h2>
            <h1 className="text-gray-900 sm:text-[29px] text-xl title-font font-medium mb-4">Order Id: {searchParams?.id}</h1>
            <p className="leading-relaxed">Yayy! Your order has been successfully placed.</p>
            <p className="leading-relaxed">Order placed on: {date}</p>
            <p className="leading-relaxed mb-4">Your payment status is <span className={`font-bold ${order?.status === 'Paid' ? 'text-green-500' : 'text-yellow-500'}`}>{order?.status}</span>.</p>
            <div className="flex mb-4">
              <a className="flex-grow py-2 text-lg px-1">Item Description</a>
              <a className="flex-grow py-2 text-lg px-1">Quantity</a>
              <a className="flex-grow py-2 text-lg px-1">Item Total</a>
            </div>
            {
              order?.products?.map((product, i) => (
                <div key={i} className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">{product?.name} ({product?.size}/{product?.color})</span>
                  <span className="ml-auto mr-auto text-gray-900">{product?.qty}</span>
                  <span className="ml-auto mr-auto text-gray-900">₹{product?.price}</span>
                </div>
              ))
            }
            <div className="flex flex-col">
              <span className="title-font my-8 font-medium text-[22px] text-gray-900">SubTotal: ₹{order?.checkoutAmount}</span>
              <div className='my-6'>
                <button className="flex ml-0 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
          </div>
          <img alt="ecommerce" className="lg:w-[40%] w-full lg:h-auto h-64 object-cover object-center rounded" src="/cart.jpg" />
        </div>
      </div>
    </section>
  )
}

// fetch singleOrder data using server side rendering
const fetchSingleOrder = async (id) => {
  await connectToDb();
  let order = await Order.find({ orderId: id })
  return order;
}

export default MyOrder