'use client';
import { add, remove, subTotal } from '@/redux/CartSlice';
import axios from 'axios';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const [subTotals, setSubTotals] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state) => state.cart.products);
  const SubTotal = useSelector((state) => state.cart.subTotal);
  useEffect(() => {
    dispatch(subTotal())
    setSubTotals(SubTotal);
  })

  const handleAddToCart = (id) => {
    dispatch(add({ id }));
    dispatch(subTotal());
  }
  const handleRemoveFromCart = (id) => {
    dispatch(remove(id));
    dispatch(subTotal());
  }

  const handlePayment = async (amount) => {
    const { data: { order } } = await toast.promise(
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/payment`, { amount }),
      {
        pending: 'Please wait...',
        success: {
          render() {
            return 'You are successfully done!'
          },
        },
        error: 'Please try again',
      },
      {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    )
    console.log(order);
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Vivek Parde",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id,
      handler: async function (response) {
        const { data } = await axios.post('http://localhost:3000/api/verify', { response });
        if (data.success) {
          router.push('/paymentdone');
        }
      },
      prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000" //Provide the customer's phone number for better conversion rates 
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#121212"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <div className='container m-auto px-3'>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex flex-col md:flex-row my-4">
        <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
          <label htmlFor="name" className='text-gray-500'>Name</label>
          <input type="text" name='name' id='name' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
        <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
          <label htmlFor="email" className='text-gray-500'>Email</label>
          <input type="email" name='email' id='email' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
      </div>
      <div className="px-2 flex flex-col justify-center w-full">
        <label htmlFor="address" className='text-gray-500'>Address</label>
        <textarea name="address" id="address" className='px-2 rounded border-2 border-gray-300' cols="30" rows="3"></textarea>
      </div>
      <div className="mx-auto flex flex-col md:flex-row my-4">
        <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
          <label htmlFor="phone" className='text-gray-500'>Phone</label>
          <input type="tel" name='phone' id='phone' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
        <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
          <label htmlFor="city" className='text-gray-500'>City</label>
          <input type="text" namse='city' id='city' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
      </div>
      <div className="mx-auto flex flex-col md:flex-row my-4">
        <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
          <label htmlFor="state" className='text-gray-500'>State</label>
          <input type="text" name='state' id='state' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
        <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
          <label htmlFor="pincode" className='text-gray-500'>Pincode</label>
          <input type="number" name='pincode' id='pincode' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
      </div>
      <h2 className='font-semibold text-xl mt-10'>2. Review Cart Items</h2>
      <div className='py-3 px-8'>
        {items.length !== 0 && <ol className='list-decimal font-semibold mb-10'>
          {items.length !== 0 && items?.map((item, index) => (
            <li key={index}>
              <div className="flex my-3">
                <div className='font-semibold'>{item.name}({item.size}/{item.color})</div>
                <div className='w-1/3 font-semibold flex justify-center items-center'><AiOutlineMinusCircle onClick={() => handleRemoveFromCart(item.id)} className='cursor-pointer' size={20} /><span className='mx-2'>{item.qty}</span><AiOutlinePlusCircle onClick={() => handleAddToCart(item.id)} className='cursor-pointer' size={20} /></div>
              </div>
            </li>
          ))}
        </ol>}
        {items.length === 0 && <div className='font-medium text-lg'>Cart is empty</div>}
        {items.length !== 0 &&
          <div className='flex gap-5 items-center'>
            <span className='font-bold'>SubTotal: {subTotals}</span>
            <button onClick={() => handlePayment(subTotals)} className="flex text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded"><BsFillBagCheckFill className='m-1' />Pay {subTotals}</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Checkout