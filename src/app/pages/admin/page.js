"use client";
import axiosInstance from "@/helpers/axiosInstance";
import { GiMoneyStack } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
const Dashboard = () => {
  const [monthlySalesRecord, setMonthlySalesRecord] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState(0);
  useEffect(() => {
    (
      async () => {
        const { data } = await axiosInstance.post("/api/payment/allpayments", { count: 100 });
        setMonthlySalesRecord(data.monthlySalesRecord);
        setTotal(data.total);
        setOrders(data.allPayments.count);
      }
    )();
  }, []);

  const paymentData = {
    labels: [
      "January",
      "Febraury",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Paid Orders",
        data: monthlySalesRecord,
        backgroundColor: ["green"],
      },
    ],
  };
  return (
    <div className="p-5">
      <h1 className="text-center font-semibold text-2xl mt-10">Dashboard</h1>
      <div className="relative flex justify-center">
        <Bar className="h-[60vh]" data={paymentData} />
      </div>
      <div className="flex mx-auto mt-5 items-center justify-between py-5 px-5 gap-5 rounded-md shadow-xl max-w-xl">
        <div className="flex flex-col items-center">
          <p className="font-semibold">Total Revenue of {orders} orders</p>
          <h3 className="text-4xl font-bold">
            ₹ {total}
          </h3>
        </div>
        <GiMoneyStack className="text-green-500 text-5xl" />
      </div>
    </div>
  );
};

export default Dashboard;