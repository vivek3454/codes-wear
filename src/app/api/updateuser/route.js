import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import User from "@/models/User";

export async function POST(Request) {
    try {

        const { name, address, pincode, phone } = await Request.json();
        // get token from cookies
        const token = cookies().get("codesWearJwt");
        if (!token) {
            return NextResponse.json({ success: false }, { status: 401 });
        }
        // update user info
        const { email } = await verify(token.value, process.env.JWT_SECRET);
        await User.findOneAndUpdate({ email }, { name, address, pincode, phone });
        return NextResponse.json({ success: true, message: "Users information updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });

    }
}