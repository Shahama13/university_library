"use server"

import { db } from "@/database/drizzle"
import { users } from "@/database/schema"
import { eq } from "drizzle-orm"
import { hash } from "bcryptjs"
import { redirect } from "next/navigation";
import { signIn } from "@/auth"
import { headers } from "next/headers"
import ratelimit from "../ratelimit"
import { workflowClient } from "../workflow"
import config from "../config"

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const {
        email,
        password,
    } = params

    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");

    try {

        const result = await signIn("credentials", {
            email, password,
            redirect: false
        })


        if (result?.error) {
            return { success: false, error: result.error };
        }

        return { success: true };

    } catch (error) {
        console.log(error, "Sign in error")
        return { success: false, error: "Sign in error" }
    }

}


export const signUp = async (params: AuthCredentials) => {
    const { fullname,
        email,
        password,
        universityId,
        universityCard } = params

    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) return redirect("/too-fast");

    const existinguser = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (existinguser.length > 0) {
        return { success: false, error: "User already exists" }
    }

    const hashedpassword = await hash(password, 10)

    try {
        await db.insert(users).values({
            fullname,
            email,
            universityCard,
            universityId,
            password: hashedpassword
        })

        await signInWithCredentials({ email, password })

        await workflowClient.trigger({
            url: `${config.env.prodApiEndpint}/api/workflow/onboarding`,
            body: {
                email,
                fullname
            },
            retries: 1
        })

        return { success: true }

    } catch (error) {
        console.log(error, "Sign up error")
        return { success: false, error: "Sign up error" }
    }

}