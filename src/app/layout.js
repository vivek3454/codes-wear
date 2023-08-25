"use client"
import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { useState } from 'react'
import AppProvider from '@/redux/AppProvider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CodesWear.com - Wear the code',
  description: 'CodesWear.com is ecommerce store.',
}

export default function RootLayout({ children }) {
  const [cart, setCart] = useState([])
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar />
          {children}
          <Footer />
        </AppProvider>
        <ToastContainer/>
      </body>
    </html>
  )
}
