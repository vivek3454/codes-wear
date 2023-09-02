import Link from 'next/link'
import React from 'react'

const PaymentDone = () => {
    return (
        <div className='h-screen overflow-y-hidden flex flex-col justify-center items-center'>
            <div className='text-3xl font-semibold'>Order Successful</div>
            <Link href={'/'} className='text-blue-500'>Go to Home</Link>
        </div>
    )
}

export default PaymentDone