"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '@/redux/CartSlice';
import Product from '@/models/Product';
import axios from 'axios';

const ProductDetail = ({ params }) => {
  const {slug} = params;
  const dispatch = useDispatch();
  const [pin, setPin] = useState();
  const [servicebility, setServicebility] = useState();
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [variants, setVariants] = useState({});

  useEffect(() => {
    const getProduct = async ()=>{
      const {data} = await axios.post('http://localhost:3000/api/getproduct', {slug});
      setColor(data.product.color)
      setSize(data.product.size)
      setVariants(data.variants);
    }
    getProduct()
  
  }, [slug])  

  const onChangePin = (e)=>{
    setPin(e.target.value);
  }

  const checkServicebility = async ()=>{
    let pins = await axios.get('http://localhost:3000/api/pincode');
    pins = await pins.json();
    if (pins.includes(parseInt(pin))) {
      setServicebility(true);
    }
    else{
      setServicebility(false);
    }
  }

  const handleAddToCart = ()=>{
    dispatch(add({id:1, name: 'hoodie', price: 499, qty: 1}));
  }

  const refreshVariant = (newColor, newSize)=>{
    let url = `http://localhost:3000/product/${variants[newColor][newSize]['slug']}`;
    window.location.href = url;
  }


  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-14 mx-auto">
        <div className="lg:w-4/5 w-full mx-auto flex justify-center flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-96 object-contain object-top rounded" src="https://m.media-amazon.com/images/I/61BYaul0M6L._UY741_.jpg" />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">The Catcher in the Rye</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes('white') && Object.keys(variants['white']).includes(size) && <button onClick={()=> refreshVariant('white', size)} className={`border-2 ${color === 'white' ? 'border-black' : 'border-gray-400'} bg-white rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('black') && Object.keys(variants['black']).includes(size) && <button onClick={()=> refreshVariant('black', size)} className={`border-2 ${color === 'black' ? 'border-black' : 'border-gray-400'} ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={()=> refreshVariant('red', size)} className={`border-2 ${color === 'red' ? 'border-black' : 'border-gray-400'} ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('green') && Object.keys(variants['green']).includes(size) && <button onClick={()=> refreshVariant('green', size)} className={`border-2 ${color === 'green' ? 'border-black' : 'border-gray-400'} ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('blue') && Object.keys(variants['blue']).includes(size) && <button onClick={()=> refreshVariant('blue', size)} className={`border-2 ${color === 'blue' ? 'border-black' : 'border-gray-400'} ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes('orange') && Object.keys(variants['orange']).includes(size) && <button onClick={()=> refreshVariant('orange', size)} className={`border-2 ${color === 'orange' ? 'border-black' : 'border-gray-400'} ml-1 bg-orange-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e)=> refreshVariant(color,e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 text-base pl-3 pr-10">
                      {variants[color] !== undefined && Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                      {variants[color] !== undefined && Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                      {variants[color] !== undefined && Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                      {variants[color] !== undefined && Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                      {variants[color] !== undefined && Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹499</span>
                <button className="flex ml-4 text-white bg-red-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-red-600 rounded">Buy Now</button>
                <button onClick={handleAddToCart} className="flex ml-2 text-white bg-red-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-red-600 rounded">Add to Cart</button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className='mt-5 flex space-x-2'>
                <input type="text" placeholder='Enter your pincode' onChange={onChangePin} value={pin} className='px-2 border-2 border-gray-400 outline-none focus:border-red-500 rounded' />
                <button onClick={checkServicebility} className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Check</button>
              </div>
              {(!servicebility && servicebility != null) && <div className='text-red-600 text-sm'>We do not deliver to this pincode</div>}
              {servicebility && <div className='text-green-600 text-sm'>Yay! This pincode is serviceable</div>}
            </div>
        </div>
      </div>
    </section>
  )
}

const getSingleProduct = async (slug)=>{
  await connectToDb();
  const products = await Product.find({slug});
  let tshirts = {};
  for (const product of products) {
      if (product.slug in tshirts) {
          if (!tshirts[product.slug].color.includes(product.color) && product.availableQty > 0) {
              tshirts[product.slug].color.push(product.color);
          }
          if (!tshirts[product.slug].size.includes(product.size) && product.availableQty > 0) {
              tshirts[product.slug].size.push(product.size);
          }
      }
      else {
          tshirts[product.slug] = JSON.parse(JSON.stringify(product));
          if (product.availableQty > 0) {
              tshirts[product.slug].color = [product.color,...color];
              tshirts[product.slug].size = [product.size, ...size];
          }
      }
  }
  return NextResponse.json({ tshirts }, { status: 200 });
}

export default ProductDetail