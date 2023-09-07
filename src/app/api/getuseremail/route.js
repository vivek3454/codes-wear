import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(Request) {
    const token = cookies().get('codesWearJwt');
    if (!token) {
        return NextResponse.json({ success: false });
    }
    const { email } = await verify(token.value, process.env.JWT_SECRET);
    return NextResponse.json({success: true, email });
}