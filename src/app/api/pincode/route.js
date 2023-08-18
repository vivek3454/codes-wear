import { NextResponse } from "next/server";

export async function GET(Request) {
  return NextResponse.json([431133, 431103, 431109]);
}