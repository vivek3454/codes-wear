import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(Request) {
    // get token from cookies
    const token = cookies().get('codesWearJwt');
    if (!token) {
        return NextResponse.json({ success: false });
    }
    // send user email in response
    const { email } = await verify(token.value, process.env.JWT_SECRET);
    return NextResponse.json({success: true, email });
}