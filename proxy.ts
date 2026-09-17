import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const proxy = auth((req) => {
    const { pathname } = req.nextUrl
    const isLoggedIn = !!req.auth

    if (
        !isLoggedIn &&
        (pathname === "/" || pathname.startsWith("/my-profile"))
    ) {
        return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    if (
        isLoggedIn &&
        (pathname === "/sign-in" || pathname === "/sign-up")
    ) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.next()
})

export const config = {
    matcher: [
        "/",
        "/my-profile/:path*",
        "/sign-in",
        "/sign-up",
    ],
}

// matcher tells Next.js:

// Only run my proxy for these URLs.