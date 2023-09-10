import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import User from "@/models/User";

export async function POST(Request) {
    const {name, address, pincode, phone} = await Request.json();
    // get token from cookies
    const token = cookies().get('codesWearJwt');
    if (!token) {
        return NextResponse.json({ success: false });
    }
    // update user info
    const {email} = await verify(token.value, process.env.JWT_SECRET);
    await User.findOneAndUpdate({email},{name, address, pincode, phone});
    return NextResponse.json({ success: true, message: 'Users information updated successfully' });
}