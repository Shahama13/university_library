"use server"
import { db } from "@/database/drizzle"
import { books, borrowRecords, users } from "@/database/schema"
import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface GetAllBowrrowRecordsParams {
    sort?: "records-asc" | "records-desc";
}

export async function getBorrowRecords({ sort = "records-asc" }: GetAllBowrrowRecordsParams = {}) {

    const orderBy = sort === "records-asc" ? asc(borrowRecords.createdAt) : desc(borrowRecords.createdAt)

    return db
        .select({
            borrowRecord: borrowRecords,
            book: books,
            user: {
                id: users.id,
                fullname: users.fullname,
                email: users.email,
            },
        })
        .from(borrowRecords)
        .leftJoin(books, eq(books.id, borrowRecords.bookId))
        .leftJoin(users, eq(users.id, borrowRecords.userId))
        .orderBy(orderBy)

}

export async function updateBorrowRecord(newStatus: borrowStatus, id: string) {
    await db.update(borrowRecords).set({
        status: newStatus, returnDate:
            newStatus === "RETURNED" || newStatus === "LATE_RETURNED"
                ? new Date().toISOString().split("T")[0]
                : null,
    }).where(eq(borrowRecords.id, id))
    revalidatePath("/admin/book-requests")
}