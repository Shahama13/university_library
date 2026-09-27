"use server"
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { asc, count, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


interface GetAllUsersParams {
    sort?: "user-asc" | "user-desc";
}

export async function getAllUsers({ sort = "user-asc" }: GetAllUsersParams = {}) {
    const orderBy = sort === "user-desc" ? desc(users.fullname) : asc(users.fullname);

    return db
        .select({
            id: users.id,
            fullname: users.fullname,
            email: users.email,
            universityId: users.universityId,
            universityCard: users.universityCard,
            status: users.status,
            role: users.role,
            lastActivityDate: users.lastActivityDate,
            createdAt: users.createdAt,
            borrowedBooks: count(borrowRecords.id),
        }).from(users).leftJoin(borrowRecords, eq(borrowRecords.userId, users.id))
        .groupBy(users.id)
        .orderBy(orderBy);
}


export async function deleteUser(id:string){
    await db.delete(users).where(eq(users.id, id))
    revalidatePath("/admin/user")
}