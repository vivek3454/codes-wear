'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Orders = () => {
  const router = useRouter();
  useEffect(() => {
      if (!localStorage.getItem('token')) {
        router.push('/');
      }
    }, [])
  return (
    <div className='container mx-auto px-5'>
      <h1 className='font-bold text-xl py-10 px-2 text-center'>My Orders</h1>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Apple MacBook Pro 1
              </th>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                $2999
              </td>
            </tr>
            <tr className="bg-white border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">
                White
              </td>
              <td className="px-6 py-4">
                Laptop PC
              </td>
              <td className="px-6 py-4">
                $1999
              </td>
            </tr>
            <tr className="bg-white border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">
                Black
              </td>
              <td className="px-6 py-4">
                Accessories
              </td>
              <td className="px-6 py-4">
                $99
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Orders