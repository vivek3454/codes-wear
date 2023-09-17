import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET(Request) {
    // get token from cookies
    const token = cookies().get("codesWearJwt");
    if (!token) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
    // send user email in response
    try {
        const { email } = verify(token.value, process.env.JWT_SECRET);
        let user = await User.findOne({ email: email });
        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}