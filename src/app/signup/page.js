"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axiosInstance from "@/helpers/axiosInstance";


const Signup = () => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "", password: "" });
  const [showHidePassword, setShowHidePassword] = useState(false);
  const router = useRouter();

  // function to show or hide password
  const handlePasswordShowHide = () => {
    setShowHidePassword(!showHidePassword);
  };

  // function to sign up
  const handleSubmit = async (e) => {
    e.preventDefault();
    // checking input fields are empty
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast.warn("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // email validation using regex
    if (!userInfo.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      toast.warn("Invalid email id", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // password validation using regex
    if (!userInfo.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.warn("Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const res = await toast.promise(
      axiosInstance.post("/api/signup", userInfo),
      {
        pending: "Please wait...",
        success: {
          render() {
            router.push("/login");
            return "Your account created successfully";
          },
        },
        error: {
          render({ data }) {
            return data?.response?.data?.message;
          },
        },
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
    );

  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto w-32" src="/codesWear.png" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form noValidate={true} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div className="mt-2">
              <input onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} value={userInfo.name} id="name" name="name" type="text" autoComplete="name" required className="block px-3 w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} value={userInfo.email} id="email" name="email" type="email" autoComplete="email" required className="block px-3 w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div className="mt-2 relative">
              <input onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} value={userInfo.password} id="password" name="password" type={`${showHidePassword ? "text" : "password"}`} autoComplete="current-password" required className="block px-3 outline-none w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" />
              <span onClick={handlePasswordShowHide} className="absolute right-3 top-[10px] cursor-pointer">
                {showHidePassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Sign up</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          already have an account?
          <Link href="/login" className="font-semibold ml-1 leading-6 text-red-500 hover:text-red-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;