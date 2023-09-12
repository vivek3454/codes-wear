"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Forgot = ({ _, searchParams }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  const handleOnChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    else if (e.target.name === "password") {
      setNewPassword(e.target.value);
    }
    else {
      setConfirmNewPassword(e.target.value);
    }
  };
  const sendResetEmail = async (e) => {
    e.preventDefault();

    // email validation using regex
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
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
    await toast.promise(
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/forgotpassword`, { email, sendMail: true }),
      {
        pending: "Please wait...",
        success: {
          render({ data }) {
            return data.data.message;
          },
        },
        error: {
          render({ data }) {
            return data.response.data.message;
          },
        }
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

  const resetPassword = async (e) => {
    e.preventDefault();
    // password validation using regex
    if (!newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
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
    if (newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
      await toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/forgotpassword`, { token: searchParams.token, newPassword, sendMail: false }),
        {
          pending: "Please wait...",
          success: {
            render({ data }) {
              router.push("/login");
              return data.data.message;
            },
          },
          error: {
            render({ data }) {
              return data.response.data.message;
            },
          }
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
    }
    else {
      toast.warn("Please enter same password", {
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
  };

  return (
    <div className="flex min-h-[90vh] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto w-32" src="/codesWear.png" alt="logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {searchParams?.token &&
          <form noValidate={true} onSubmit={resetPassword} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
              <div className="mt-2">
                <input onChange={handleOnChange} id="password" name="password" type="password" required className="block px-4 w-full rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div>
              <label htmlFor="confirmpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm New Password</label>
              <div className="mt-2">
                <input onChange={handleOnChange} id="confirmpassword" name="confirmpassword" type="password" autoComplete="email" required className="block px-4 w-full rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Continue</button>
            </div>
          </form>}

        {!searchParams?.token &&
          <form noValidate={true} onSubmit={sendResetEmail} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input onChange={handleOnChange} value={email} id="email" name="email" type="email" autoComplete="email" required className="block px-4 w-full rounded-md border-0 outline-none py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Continue</button>
            </div>
          </form>}

        <p className="mt-10 text-center text-sm text-gray-500">
          already have an account?
          <Link href="/login" className="font-semibold ml-1 leading-6 text-red-500 hover:text-red-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Forgot;