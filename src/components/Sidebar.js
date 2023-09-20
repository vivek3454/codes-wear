"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { AiFillCloseCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { BiHomeAlt, BiSolidCartAdd } from "react-icons/bi";
import { FiUpload } from "react-icons/fi";
import { GrUndo } from "react-icons/gr";
import { RxUpdate } from "react-icons/rx";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar = () => {
    const [isOpen, setisOpen] = useState(false);
    const path = usePathname();
    console.log(path);
    const handleOpen = () => {
        setisOpen(true);
    };
    const handleClose = () => {
        setisOpen(false);
    };
    return (
        <>
            <aside className={`px-4 shadow-[0px_8px_35px] transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0  shadow-gray-300 w-60 fixed top-0 left-0 bottom-0 md:static bg-white`}>
                <div className="flex flex-col gap-5">
                    <div className="px-2 py-3 flex items-center justify-between">
                        <Link href={"/"} className="flex items-center">
                            <Image src={"/codesWear.png"} alt="logo" width={60} height={20} className="-ml-5" />
                            <span className="text-lg font-semibold">CodesWear</span>
                        </Link>
                        {isOpen && <AiFillCloseCircle className="cursor-pointer md:hidden" size={26} onClick={handleClose} />}
                    </div>
                    <div className="my-5 flex flex-col gap-5">
                        <Link href={"/pages/admin"} onClick={handleClose} className={`px-2 py-1 rounded ${path === "/pages/admin" ? "hover:bg-red-400" : "hover:bg-gray-100"} ${path === "/pages/admin" ? "bg-red-400" : "bg-white"} flex gap-3 items-center`}>
                            <BiHomeAlt size={20} className="text-gray-700" />
                            Dashboard
                        </Link>
                        <Link href={"/pages/admin/addproduct"} onClick={handleClose} className={`px-1 py-1 rounded ${path === "/pages/admin/addproduct" ? "hover:bg-red-400" : "hover:bg-gray-100"} ${path === "/pages/admin/addproduct" ? "bg-red-400" : "bg-white"} flex gap-3 items-center`}>
                            <FiUpload size={20} className="text-gray-700" />
                            Add Products
                        </Link>
                        <Link href={"/pages/admin/updateproduct"} onClick={handleClose} className={`px-1 py-1 rounded ${path === "/pages/admin/updateproduct" ? "hover:bg-red-400" : "hover:bg-gray-100"} ${path === "/pages/admin/updateproduct" ? "bg-red-400" : "bg-white"} flex gap-3 items-center`}>
                            <RxUpdate size={18} className="text-gray-700" />
                            Update Products
                        </Link>
                        <Link href={"/pages/admin/orders"} onClick={handleClose} className={`px-1 py-1 rounded ${path === "/pages/admin/orders" ? "hover:bg-red-400" : "hover:bg-gray-100"} ${path === "/pages/admin/orders" ? "bg-red-400" : "bg-white"} flex gap-3 items-center`}>
                            <AiOutlineShoppingCart size={20} className="text-gray-700" />
                            Orders
                        </Link>
                        <Link href={"/"} className="px-2 py-1 rounded hover:bg-gray-100 flex gap-3 items-center">
                            <GrUndo size={20} className="text-gray-700" />
                            Go to HomePage
                        </Link>
                    </div>

                </div>
            </aside>
            <div className="w-full m-5 md:hidden bg">
                {!isOpen && <MdMenu className="cursor-pointer" size={26} onClick={handleOpen} />}
            </div>
        </>
    );
};

export default Sidebar;