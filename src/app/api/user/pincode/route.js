import { NextResponse } from "next/server";
import pincodes from "../../../../data/pincodes";

export async function GET(Request) {
  return NextResponse.json(pincodes);
}