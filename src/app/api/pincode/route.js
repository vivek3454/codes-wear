import { NextResponse } from "next/server";

export async function GET(Request) {
  // pincodes object with key: pincode and value:array of district and state
  let pincodes = {
    '431103': ['Sambhajinagar', 'Maharashtra'],
    '110003': ['Delhi', 'Delhi'],
    '560017': ['Banglore', 'Karnataka'],
    '721302': ['Kharagpur', 'West Bengal'],
  }
  return NextResponse.json(pincodes);
}