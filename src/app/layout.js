"use client"
import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Suspense, useState } from 'react'
import AppProvider from '@/redux/AppProvider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CodesWear.com - Wear the code',
  description: 'CodesWear.com is ecommerce store.',
}

export default function RootLayout({ children }) {
  const path = usePathname();
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [path])

  // funtion to logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ value: null });
    setKey(Math.random());
    router.push('/');
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Navbar user={user} key={key} handleLogout={handleLogout} />
          {children}
          <Footer />
        </AppProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
