'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Mugs = () => {
  const [mugs, setMugs] = useState([]);
  // getting all mugs and storing in state
  useEffect(() => {
    const getMugs = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getMugs`)
      setMugs(res.data.mugs);
    }
    getMugs();
  }, [])

  return (
    <section className="text-gray-600 container mx-auto">
      {(mugs.length === 0 || mugs.length === undefined) && <div className='h-[60vh] flex justify-center items-center'>No mugs</div>}
      {mugs.length > 0 && <div className="px-5 py-24 mx-auto">
        <div className="flex flex-wrap justify-center -m-4">
          {Object.keys(mugs).map((product, i) => (

            <Link key={i} href={`/product/${mugs[product].slug}`} className='shadow m-2 rounded'>
              <div className="w-60 m-5 p-4">
                <div className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="object-contain object-center w-full h-[45vh] block" src="https://m.media-amazon.com/images/I/61BYaul0M6L._UY741_.jpg" />
                </div>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{mugs[product].title}</h2>
                  <p className="mt-1">₹{mugs[product].price}</p>
                  <div className="mt-1">
                    {mugs[product].size.includes('S') && <span className='border border-gray-400 mx-1 px-1'>S</span>}
                    {mugs[product].size.includes('M') && <span className='border border-gray-400 mx-1 px-1'>M</span>}
                    {mugs[product].size.includes('L') && <span className='border border-gray-400 mx-1 px-1'>L</span>}
                    {mugs[product].size.includes('XL') && <span className='border border-gray-400 mx-1 px-1'>XL</span>}
                    {mugs[product].size.includes('XXL') && <span className='border border-gray-400 mx-1 px-1'>XXL</span>}
                  </div>
                  <div className="mt-1">
                    {mugs[product].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {mugs[product].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {mugs[product].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    {mugs[product].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    {mugs[product].color.includes('orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>}
    </section>
  )
}

export default Mugs