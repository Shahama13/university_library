"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { and, eq, ilike, or, count } from "drizzle-orm";
import dayjs from "dayjs";
import { sendEmail } from "@/lib/workflow";
import { bookBorrowedEmail, bookReceiptEmail } from "@/lib/workflow/email-templates";

const SITE_URL = process.env.NEXT_PUBLIC_PROD_API_ENDPOINT ?? "https://bookwise.app";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select({ availableCopies: books.availableCopies, title: books.title })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const bookRecord = await db
      .select()
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId)
        )
      );

    if (bookRecord.length > 0) {
      return {
        success: false,
        error: "You have already borrowed this book and cannot borrow it again.",
      };
    }

    const borrowDate = dayjs().toDate().toDateString();
    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db.insert(borrowRecords).values({
      userId,
      bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    // fire-and-forget: a failed email shouldn't undo a successful borrow
    try {
      const [user] = await db
        .select({ email: users.email, fullname: users.fullname })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (user) {
        await sendEmail({
          email: user.email,
          subject: "You've Borrowed a Book!",
          message: bookBorrowedEmail({
            fullname: user.fullname,
            bookTitle: book[0].title,
            borrowDate,
            dueDate,
            borrowedBooksUrl: `${SITE_URL}/my-profile`,
          }),
        });

        await sendEmail({
          email: user.email,
          subject: `Your Receipt for ${book[0].title} is Ready!`,
          message: bookReceiptEmail({
            fullname: user.fullname,
            bookTitle: book[0].title,
            borrowDate,
            dueDate,
            receiptUrl: `${SITE_URL}/my-profile`,
          }),
        });
      }
    } catch (emailError) {
      console.log("Failed to send borrow emails:", emailError);
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

const PAGE_SIZE = 12;

interface SearchBooksParams {
  query?: string;
  genre?: string;
  page?: number;
}

export async function searchBooks({
  query,
  genre,
  page = 1,
}: SearchBooksParams) {
  const conditions = [];

  if (query) {
    conditions.push(
      or(ilike(books.title, `%${query}%`), ilike(books.author, `%${query}%`), ilike(books.genre, `%${query}%`)),
    );
  }

  if (genre && genre !== "all") {
    conditions.push(eq(books.genre, genre));
  }

  const where = conditions.length ? and(...conditions) : undefined;
  const offset = (page - 1) * PAGE_SIZE;

  const [items, totalResult] = await Promise.all([
    db.select().from(books).where(where).limit(PAGE_SIZE).offset(offset),
    db.select({ count: count() }).from(books).where(where),
  ]);

  const total = totalResult[0]?.count ?? 0;

  return {
    items,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getGenres() {
  const rows = await db.selectDistinct({ genre: books.genre }).from(books);
  return rows.map((r) => r.genre).filter(Boolean);
}