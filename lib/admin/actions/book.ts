"use server";

import { books, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import ImageKit from "imagekit"
import config from "@/lib/config"
import { revalidatePath } from "next/cache";
import { asc, desc, eq } from "drizzle-orm";

const imagekit = new ImageKit({
  publicKey: config.env.imagekit.publicKey,
  privateKey: config.env.imagekit.privateKey,
  urlEndpoint: config.env.imagekit.urlEndpoint,
})

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
interface GetAllBooksParams {
  sort?: "title-asc" | "title-desc";
}

export async function getAllBooks({ sort = "title-asc" }: GetAllBooksParams = {}) {
  const orderBy = sort === "title-desc" ? desc(books.title) : asc(books.title);

  return db.select().from(books).orderBy(orderBy);
}

async function deleteImageKitFile(filePath?: string | null) {
  if (!filePath) return

  try {
    // "/book/covers/abc.jpg" -> folder "/book/covers", name "abc.jpg"
    const clean = filePath.startsWith("/") ? filePath : `/${filePath}`
    const name = clean.split("/").pop()!
    const folder = clean.slice(0, clean.lastIndexOf("/")) || "/"

    const files = await imagekit.listFiles({
      path: folder,
      searchQuery: `name="${name}"`,
      limit: 1,
    })

    const file = files[0]
    if (file && "fileId" in file) {
      await imagekit.deleteFile(file.fileId)
    }
  } catch (error) {
    // don't block book deletion if the file cleanup fails
    console.log("ImageKit delete failed:", filePath, error)
  }
}

export async function deleteBook(id: string) {
  const [book] = await db.select().from(books).where(eq(books.id, id)).limit(1)

  if (!book) return { success: false, message: "Book not found" }

  await db.delete(books).where(eq(books.id, id))

  await Promise.all([
    deleteImageKitFile(book.coverUrl),
    deleteImageKitFile(book.videoUrl),
  ])

  revalidatePath("/admin/books")
  return { success: true }
}

export async function getBookById(id:string){
  const [book] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1)

  return book ?? null
}

export async function updateBook(id: string, params: BookParams) {
  try {
    const [book] = await db
      .update(books)
      .set({ ...params })
      .where(eq(books.id, id))
      .returning()

    return { success: true, data: JSON.parse(JSON.stringify(book)) }
  } catch (error) {
    console.log(error)
    return { success: false, message: "An error occurred while updating the book" }
  }
}