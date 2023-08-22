'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Tshirts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetch('http://localhost:3000/api/getproducts')
      const data = await res.json();
      setProducts(data.tshirts);
    }
    getAllProducts();
  }, [])

  return (
    <section className="text-gray-600 container mx-auto">
      <div className="px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -m-4">
          {Object.keys(products).map((product, i) => (

            <Link key={i} href={`/product/${products[product].slug}`} className='shadow m-2 rounded'>
              <div className="w-60 m-5 p-4">
                <div className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="object-contain object-center w-full h-[45vh] block" src="https://m.media-amazon.com/images/I/71tJWaahoDL._UY741_.jpg" />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[product].title}</h2>
                  <p className="mt-1">₹{products[product].price}</p>
                  <div className="mt-1">
                    {products[product].size.includes('S') && <span className='border border-gray-400 mx-1 px-1'>S</span>}
                    {products[product].size.includes('M') && <span className='border border-gray-400 mx-1 px-1'>M</span>}
                    {products[product].size.includes('L') && <span className='border border-gray-400 mx-1 px-1'>L</span>}
                    {products[product].size.includes('XL') && <span className='border border-gray-400 mx-1 px-1'>XL</span>}
                    {products[product].size.includes('XXL') && <span className='border border-gray-400 mx-1 px-1'>XXL</span>}
                  </div>
                  <div className="mt-1">
                    {products[product].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[product].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[product].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[product].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {products[product].color.includes('orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tshirts