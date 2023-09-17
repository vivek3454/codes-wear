import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(Request) {
    // delete cookies
    cookies().delete("codesWearJwt");
    return NextResponse.json({ success: true, message: "Log out successfully" }, { status: 200 });
}