'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const MyAccount = () => {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
          router.push('/');
        }
      }, [])
  return (
    <div className='container mx-auto px-5'>MyAccount</div>
  )
}

export default MyAccount