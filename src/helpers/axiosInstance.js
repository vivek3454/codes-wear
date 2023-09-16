"use client";

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_VERCEL_ENV,
    withCredentials: true
});

export default axiosInstance;