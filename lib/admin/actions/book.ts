"use server";

import { books, users } from "@/database/schema";
import { db } from "@/database/drizzle";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};



import { revalidatePath } from "next/cache";
import { asc, desc, eq } from "drizzle-orm";

interface GetAllBooksParams {
  sort?: "title-asc" | "title-desc";
}

export async function getAllBooks({ sort = "title-asc" }: GetAllBooksParams = {}) {
  const orderBy = sort === "title-desc" ? desc(books.title) : asc(books.title);

  return db.select().from(books).orderBy(orderBy);
}

export async function deleteBook(id: string) {
  await db.delete(books).where(eq(books.id, id));
  revalidatePath("/admin/books");
}
