import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
let cookie;
export async function middleware(Request) {
    cookie = Request.cookies.get("codesWearJwt");
    let pathname = Request.nextUrl.pathname;
    if (!cookie && pathname.startsWith("/pages/user/myAccount")) {
        return NextResponse.redirect(new URL("/pages/user/login", Request.url));
    }
    if (!cookie && pathname.startsWith("/pages/user/order")) {
        return NextResponse.redirect(new URL("/pages/user/login", Request.url));
    }
    if (!cookie && pathname.startsWith("/pages/user/orders")) {
        return NextResponse.redirect(new URL("/pages/user/login", Request.url));
    }
    if (cookie && pathname.startsWith("/pages/user/login")) {
        return NextResponse.redirect(new URL("/", Request.url));
    }
    if (cookie && pathname.startsWith("/pages/user/signup")) {
        return NextResponse.redirect(new URL("/", Request.url));
    }
}
