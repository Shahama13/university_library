import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { db } from "./database/drizzle"
import { users } from "./database/schema"
import { eq } from "drizzle-orm"

export const proxy = auth(async (req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;
    const userId = req.auth?.user?.id;

    if (
        !isLoggedIn &&
        (pathname === "/" || pathname.startsWith("/my-profile"))
    ) {
        return NextResponse.redirect(
            new URL("/sign-in", req.url)
        );
    }

    let isAdmin = false;

    if (userId) {
        const result = await db
            .select({ role: users.role })
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        isAdmin = result[0]?.role === "ADMIN";
    }

    if (pathname.startsWith("/admin") && !isAdmin) {
        return NextResponse.redirect(
            new URL("/", req.url)
        );
    }

    if (
        isLoggedIn &&
        (pathname === "/sign-in" || pathname === "/sign-up")
    ) {
        return NextResponse.redirect(
            new URL("/", req.url)
        );
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/",
        "/my-profile/:path*",
        "/sign-in",
        "/sign-up",
        "/admin/:path*"
    ],
}

// matcher tells Next.js:

// Only run my proxy for these URLs.