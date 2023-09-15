import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
let cookie;
export async function middleware(Request) {
    cookie = Request.cookies.get("codesWearJwt");
    let pathname = Request.nextUrl.pathname;
    if (!cookie && pathname.startsWith("/myAccount")) {
        return NextResponse.redirect(new URL("/login", Request.url));
    }
    if (!cookie && pathname.startsWith("/order")) {
        return NextResponse.redirect(new URL("/login", Request.url));
    }
    if (!cookie && pathname.startsWith("/orders")) {
        return NextResponse.redirect(new URL("/login", Request.url));
    }
    if (cookie && pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", Request.url));
    }
    if (cookie && pathname.startsWith("/signup")) {
        return NextResponse.redirect(new URL("/", Request.url));
    }
}
