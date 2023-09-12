"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyAccount = () => {
  const [userInfo, setUserInfo] = useState({ name: "", email: "", address: "", pincode: "", phone: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const router = useRouter();
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`);
      if (data.success) {
        setUserInfo({ ...userInfo, name: data?.user?.name, email: data?.user?.email, address: data?.user?.address, pincode: data?.user?.pincode, phone: data?.user?.phone });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
    getUserData();
  }, []);

  // handle user input
  const handleOnchange = async (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // function to update user information
  const updateUserInfo = async () => {
    await toast.promise(
      axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, { name: userInfo.name, address: userInfo.address, pincode: userInfo.pincode, phone: userInfo.phone }),
      {
        pending: "Please wait...",
        success: {
          render({ data }) {
            setUserInfo({ ...userInfo, email: data?.user?.email, address: data?.user?.address, pincode: data?.user?.pincode });
            getUserData();
            return data?.data?.message;
          },
        },
        error: {
          render({ data }) {
            return data?.data?.message;
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
  // function to update user password
  const updateUserPassword = async () => {
    if (userInfo.newPassword && userInfo.confirmPassword && userInfo.newPassword === userInfo.confirmPassword) {
      await toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/updateuserpassword`, { newPassword: userInfo.newPassword, currentPassword: userInfo.currentPassword }),
        {
          pending: "Please wait...",
          success: {
            render({ data }) {
              setUserInfo({ ...userInfo, currentPassword: "", newPassword: "", confirmPassword: "" });
              return data?.data?.message;
            },
          },
          error: {
            render({ data }) {
              return data?.response?.data?.message;
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
      toast.error("New password and confirm new password is not same", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="container mx-auto my-9">
      <div>
        <h1 className="text-2xl text-center font-semibold mb-10">Update your Account</h1>
        <h2 className="font-semibold text-xl">1. Delivery Details</h2>
        <div className="mx-auto flex flex-col md:flex-row my-4">
          <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
            <label htmlFor="name" className="text-gray-500">Name</label>
            <input onChange={handleOnchange} value={userInfo.name} type="text" name="name" id="name" className="px-2 h-10 rounded border-2 border-gray-300" />
          </div>
          <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
            <label htmlFor="email" className="text-gray-500">Email(cannot be updated)</label>
            <input disabled onChange={handleOnchange} value={userInfo.email} type="email" name="email" id="email" className="px-2 h-10 rounded border-2 border-gray-300" />
          </div>
        </div>
        <div className="px-2 flex flex-col justify-center w-full">
          <label htmlFor="address" className="text-gray-500">Address</label>
          <textarea onChange={handleOnchange} value={userInfo.address} name="address" id="address" className="px-2 rounded border-2 border-gray-300" cols="30" rows="3"></textarea>
        </div>
        <div className="mx-auto flex flex-col md:flex-row my-4">
          <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
            <label htmlFor="phone" className="text-gray-500">Phone</label>
            <input onChange={handleOnchange} value={userInfo.phone} type="number" name="phone" id="phone" className="px-2 h-10 rounded border-2 border-gray-300" />
          </div>
          <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
            <label htmlFor="pincode" className="text-gray-500">Pincode</label>
            <input onChange={handleOnchange} value={userInfo.pincode} type="number" name="pincode" id="pincode" className="px-2 h-10 rounded border-2 border-gray-300" />
          </div>
        </div>
        <button onClick={updateUserInfo} className="flex text-white border-0 py-1 px-2 focus:outline-none rounded bg-red-500 hover:bg-red-600">Submit</button>
      </div>
      <div>
        <h2 className="font-semibold text-xl mt-8 mb-4">2. Change Password</h2>
        <form>
          <div className="mx-auto flex flex-col md:flex-row my-4">
            <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
              <label htmlFor="pincode" className="text-gray-500">Current Password</label>
              <input autoComplete="true" onChange={handleOnchange} value={userInfo.currentPassword} type="password" name="currentPassword" id="currentPassword" className="px-2 h-10 rounded border-2 border-gray-300" />
            </div>
            <div className="px-2 flex flex-col justify-center w-full md:w-1/2">
              <label htmlFor="password" className="text-gray-500">New Password</label>
              <input autoComplete="true" onChange={handleOnchange} value={userInfo.newPassword} type="password" name="newPassword" id="newPassword" className="px-2 h-10 rounded border-2 border-gray-300" />
            </div>
            <div className="px-2 flex flex-col mt-4 md:mt-0 justify-center w-full md:w-1/2">
              <label htmlFor="changePassword" className="text-gray-500">Confirm New Password</label>
              <input autoComplete="true" onChange={handleOnchange} value={userInfo.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" className="px-2 h-10 rounded border-2 border-gray-300" />
            </div>
          </div>
        </form>
        <button onClick={updateUserPassword} className="flex text-white border-0 py-1 px-2 focus:outline-none rounded bg-red-500 hover:bg-red-600">Submit</button>
      </div>
    </div>
  );
};

export default MyAccount;