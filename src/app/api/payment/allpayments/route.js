import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(Request) {
    try {
        const { count } = await Request.json();

        // Find all subscriptions from razorpay
        const instance = new Razorpay({ key_id: `${process.env.RAZORPAY_KEY_ID}`, key_secret: `${process.env.RAZORPAY_KEY_SECRET}` });
        const allPayments = await instance.payments.all({ count });
        const monthNames = [
            "January",
            "February",
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
        ];

        const finalMonths = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };
        let total = 0;

        const monthlyWisePayments = allPayments.items.map((payment) => {
            total += payment.amount / 100;
            // We are using payment.created_at which is in unix time, so we are converting it to Human readable format using Date()
            const monthsInNumbers = new Date(payment.created_at * 1000);
            return monthNames[monthsInNumbers.getMonth()];
        });

        monthlyWisePayments.map((month) => {
            Object.keys(finalMonths).forEach((objMonth) => {
                if (month === objMonth) {
                    finalMonths[month] += 1;
                }
            });
        });

        const monthlySalesRecord = [];

        Object.keys(finalMonths).forEach((monthName) => {
            monthlySalesRecord.push(finalMonths[monthName]);
        });

        return NextResponse.json({
            success: true,
            message: "All payments",
            allPayments,
            total,
            monthlySalesRecord
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    }
};