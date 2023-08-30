import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clear, add, remove, subTotal, getProductsCartFromLocalStorage } from '@/redux/CartSlice';

const Navbar = ({ user, handleLogout }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState(false)
  const items = useSelector((state) => state.cart.products);
  const cartRef = useRef();
  const cart1Ref = useRef();

  useEffect(() => {
    dispatch(getProductsCartFromLocalStorage());
  }, [])
  const openCart = () => {
    setIsOpen(true);
  }
  const closeCart = () => {
    setIsOpen(false);
  }
  const handleClearCart = () => {
    dispatch(clear());
  }

  useEffect(() => {
    const closeCart = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target) && !cart1Ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener('click', closeCart)

    return () => {
      window.removeEventListener('click', closeCart)
    }
  }, [])



  const handleAddToCart = (slug) => {
    dispatch(add({ slug }));
    dispatch(subTotal());
  }
  const handleRemoveFromCart = (slug) => {
    dispatch(remove(slug));
    dispatch(subTotal());
  }

  return (
    <header className="text-gray-600 sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between flex-wrap p-2 flex-col md:flex-row items-center">
        <Link href={'/'} className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <Image className='-mt-1 -mr-7 -ml-5' width={65} height={10} src="/codesWear.png" alt="logo" />
          <span className="ml-3 text-xl">CodesWear.com</span>
        </Link>
        <nav className="flex flex-wrap items-center text-base justify-center">
          <Link href={'/tshirts'} className="mr-5 hover:text-gray-900">Tshirts</Link>
          <Link href={'/hoodies'} className="mr-5 hover:text-gray-900">Hoodies</Link>
          <Link href={'stickers'} className="mr-5 hover:text-gray-900">Stickers</Link>
          <Link href={'/mugs'} className="mr-5 hover:text-gray-900">Mugs</Link>
        </nav>
        <div className='flex items-center relative'>
          {user.value &&
            <Link ref={cart1Ref} href={'/login'} className="mr-4 text-[26px] absolute top-4 right-1 md:static hover:text-gray-900">
              <MdAccountCircle onMouseOver={() => setToggleDropDown(true)} onMouseLeave={() => setToggleDropDown(false)} />
            </Link>
          }
          {toggleDropDown && <div onMouseOver={() => setToggleDropDown(true)} onMouseLeave={() => setToggleDropDown(false)} className='absolute right-0 top-6 rounded-md px-5 bg-white w-36'>
            <ul className='py-2'>
              <Link href={'/myAccount'}><li className='py-1 hover:text-black text-sm'>My Account</li></Link>
              <Link href={'/orders'}><li className='py-1 hover:text-black text-sm'>Orders</li></Link>
              <li onClick={handleLogout} className='py-1 hover:text-black cursor-pointer text-sm'>Logout</li>
            </ul>
          </div>}
          {!user.value && <Link href={'/login'} className="flex mr-4 w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Sign in</Link>}
          <div ref={cart1Ref} onClick={openCart} className="mr-5 cursor-pointer text-2xl absolute top-3 right-1 md:relative md:top-0 hover:text-gray-900">
            <AiOutlineShoppingCart />
            {items?.length > 0 && <span className='absolute top-2 left-4 text-sm bg-red-500 w-5 h-5 flex justify-center items-center font-semibold rounded-full'>{items?.length}</span>}
          </div>
        </div>
      </div>
      <div ref={cartRef} className={`w-80 overflow-y-scroll h-[100vh] absolute top-0 bottom-0 right-0 bg-red-100 py-10 px-8 transition-transform ${(isOpen) ? 'translate-x-0' : 'translate-x-full'}`}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={closeCart} className='absolute text-2xl cursor-pointer top-2 right-2 text-red-400'><AiFillCloseCircle /></span>
        <ol className='list-decimal font-semibold mb-10'>
          {items && items?.map((item, index) => (
            <li key={index}>
              <div className="flex items-center my-3">
                <div className='w-2/3 font-semibold'>{item.name}<br />({item.size}/{item.color})</div>
                <div className='w-1/3 font-semibold flex justify-center items-center'><AiOutlineMinusCircle onClick={() => handleRemoveFromCart(item.slug)} className='cursor-pointer' size={20} /><span className='mx-2'>{item.qty}</span><AiOutlinePlusCircle onClick={() => handleAddToCart(item.slug)} className='cursor-pointer' size={20} /></div>
              </div>
            </li>
          ))}
        </ol>
        <div className="flex gap-2">
          <Link href={'/checkout'}>
            <button className="flex text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded"><BsFillBagCheckFill className='m-1' /> CheckOut</button></Link>
          <button onClick={handleClearCart} className="flex text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded">Clear Cart</button>
        </div>
      </div>
    </header>
  )
}

export default Navbar