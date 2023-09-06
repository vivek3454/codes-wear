'use client';
import { add, remove, subTotal } from '@/redux/CartSlice';
import axios from 'axios';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '', address: '', city: '', state: '', phone: '' });
  const [pincode, setPincode] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const items = useSelector((state) => state.cart.products);
  useEffect(() => {
    dispatch(subTotal());
  }, [])
  const subTotals = useSelector((state) => state.cart.subTotal);

  const handleAddToCart = (slug) => {
    dispatch(add({ slug }));
    dispatch(subTotal());
  }
  const handleRemoveFromCart = (slug) => {
    dispatch(remove(slug));
    dispatch(subTotal());
  }

  const handleOnchange = async (e) => {
    if (e.target.name === 'pincode') {
      setPincode(e.target.value);
      if (e.target.value.length === 6) {
        let { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
        if (Object.keys(data).includes(e.target.value)) {
          setUserInfo({ ...userInfo, city: data[e.target.value][0], state: data[e.target.value][1] });
        }
      }
      else {
        setUserInfo((prev) => { return { ...prev, city: '', state: '' } });
      }
    }
    else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

  }
  useEffect(() => {
    if (userInfo.name && userInfo.email && userInfo.city && userInfo.state && userInfo.phone && pincode) {
      setIsDisabled(false);
    }
    else {
      setIsDisabled(true);
    }
  }, [userInfo])



  const handlePayment = async () => {
    const { data: { order, id } } = await toast.promise(
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/payment`, { checkoutAmount: subTotals, email: userInfo.email, items, address: userInfo.address }),
      {
        pending: 'Please wait...',
        success: {
          render({ data }) {
            if (data.data.success) {
              const options = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Vivek Parde",
                description: "Test Transaction",
                image: "/codesWear.png",
                order_id: order.id,
                handler: async function (response) {
                  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/verify`, { response, id });
                  if (data.success) {
                    router.push(`order?id=${order.id}`);
                  }
                },
                prefill: {
                  name: userInfo.name,
                  email: userInfo.email,
                  contact: userInfo.phone
                },
                notes: {
                  "address": "Razorpay Corporate Office"
                },
                theme: {
                  "color": "#121212"
                }
              };
              const razor = window.Razorpay(options);
              razor.open();
            }
          }
        },
        error: {
          render({ data }) {
            return data?.response?.data?.message || 'Please try again';
          }
        }
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
  }

  return (
    <div className='container m-auto px-3'>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex flex-col md:flex-row my-4">
        <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
          <label htmlFor="name" className='text-gray-500'>Name</label>
          <input onChange={handleOnchange} value={userInfo.name} type="text" name='name' id='name' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
        <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
          <label htmlFor="email" className='text-gray-500'>Email</label>
          <input onChange={handleOnchange} value={userInfo.email} type="email" name='email' id='email' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
      </div>
      <div className="px-2 flex flex-col justify-center w-full">
        <label htmlFor="address" className='text-gray-500'>Address</label>
        <textarea onChange={handleOnchange} value={userInfo.address} name="address" id="address" className='px-2 rounded border-2 border-gray-300' cols="30" rows="3"></textarea>
      </div>
      <div className="mx-auto flex flex-col md:flex-row my-4">
        <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
          <label htmlFor="phone" className='text-gray-500'>Phone</label>
          <input onChange={handleOnchange} value={userInfo.phone} type="tel" name='phone' id='phone' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
        <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
          <label htmlFor="pincode" className='text-gray-500'>Pincode</label>
          <input onChange={handleOnchange} value={pincode} type="number" name='pincode' id='pincode' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
      </div>
      <div className="mx-auto flex flex-col md:flex-row my-4">
        <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
          <label htmlFor="city" className='text-gray-500'>City</label>
          <input disabled={true} onChange={handleOnchange} value={userInfo.city} type="text" name='city' id='city' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
        <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
          <label htmlFor="state" className='text-gray-500'>State</label>
          <input disabled={true} onChange={handleOnchange} value={userInfo.state} type="text" name='state' id='state' className='px-2 h-10 rounded border-2 border-gray-300' />
        </div>
      </div>
      <h2 className='font-semibold text-xl mt-10'>2. Review Cart Items</h2>
      <div className='py-3 px-8'>
        {items.length !== 0 && <ol className='list-decimal font-semibold mb-10'>
          {items.length !== 0 && items?.map((item, index) => (
            <li key={index}>
              <div className="flex my-3">
                <div className='font-semibold'>{item.name}({item.size}/{item.color})</div>
                <div className='w-1/3 font-semibold flex justify-center items-center'><AiOutlineMinusCircle onClick={() => handleRemoveFromCart(item.slug)} className='cursor-pointer' size={20} /><span className='mx-2'>{item.qty}</span><AiOutlinePlusCircle onClick={() => handleAddToCart(item.slug)} className='cursor-pointer' size={20} /></div>
              </div>
            </li>
          ))}
        </ol>}
        {items.length === 0 && <div className='font-medium text-lg'>Cart is empty</div>}
        {items.length !== 0 &&
          <div className='flex gap-5 items-center'>
            <span className='font-bold'>SubTotal: {subTotals}</span>
            <button disabled={isDisabled} onClick={handlePayment} className={`flex text-white border-0 py-1 px-2 focus:outline-none rounded ${isDisabled ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'}`}><BsFillBagCheckFill className='m-1' />Pay {subTotals}</button>
          </div>
        }
      </div>
    </div>
  )
}

export default Checkout