import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(Request) {
    const cookie = Request.cookies.get("codesWearJwt");
    let pathname = Request.nextUrl.pathname;

    // protect user route
    if (
        !cookie &&
        (
            pathname.startsWith("/pages/user/order") ||
            pathname.startsWith("/pages/user/orders") ||
            pathname.startsWith("/pages/user/myAccount")
        )
    ) {
        return NextResponse.redirect(new URL("/pages/user/login", Request.url));
    }
    if (cookie && (pathname.startsWith("/pages/user/login") || pathname.startsWith("/pages/user/signup"))) {
        return NextResponse.redirect(new URL("/", Request.url));
    }

    // protect admin routes
    if (cookie) {
        const { payload } = await jwtVerify(cookie?.value, new TextEncoder().encode(process.env.JWT_SECRET));
        if (
            payload.role === "USER" &&
            (
                pathname.startsWith("/pages/admin") ||
                pathname.startsWith("/pages/admin/addproduct") ||
                pathname.startsWith("/pages/admin/allproducts") ||
                pathname.startsWith("/pages/admin/orders") ||
                pathname.startsWith("/pages/admin/updateproduct")
            )
        ) {
            return NextResponse.redirect(new URL("/", Request.url));
        }
    }
}
