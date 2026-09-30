"use server"
import { db } from "@/database/drizzle"
import { books, users, borrowRecords } from "@/database/schema"
import { and, count, isNull, lte, or, gt } from "drizzle-orm"

const daysAgo = (days: number) => {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

async function getUserCountAsOf(cutoff: Date) {
  const [result] = await db
    .select({ count: count() })
    .from(users)
    .where(lte(users.createdAt, cutoff))
  return result?.count ?? 0
}

async function getBookCountAsOf(cutoff: Date) {
  const [result] = await db
    .select({ count: count() })
    .from(books)
    .where(lte(books.createdAt, cutoff))
  return result?.count ?? 0
}

// "borrowed as of cutoff" = checked out on/before cutoff, and not yet
// returned by cutoff (still open, or returned after cutoff)
async function getBorrowedCountAsOf(cutoff: Date) {
  const [result] = await db
    .select({ count: count() })
    .from(borrowRecords)
    .where(
      and(
        lte(borrowRecords.borrowDate, cutoff),
        or(isNull(borrowRecords.returnDate), gt(borrowRecords.returnDate, cutoff.toISOString()))
      )
    )
  return result?.count ?? 0
}

export interface Trend {
  current: number
  previous: number
  diff: number
  percent: number | null // null when previous was 0 (percent undefined)
  direction: "up" | "down" | "flat"
}

const buildTrend = (current: number, previous: number): Trend => {
  const diff = current - previous
  const percent = previous === 0 ? null : Math.round((diff / previous) * 100)
  const direction = diff > 0 ? "up" : diff < 0 ? "down" : "flat"
  return { current, previous, diff, percent, direction }
}

export async function getDashboardMetrics(days = 7) {
  const cutoff = daysAgo(days)

  const [
    currentUsers,
    previousUsers,
    currentBooks,
    previousBooks,
    currentBorrowed,
    previousBorrowed,
  ] = await Promise.all([
    getUserCountAsOf(new Date()),
    getUserCountAsOf(cutoff),
    getBookCountAsOf(new Date()),
    getBookCountAsOf(cutoff),
    getBorrowedCountAsOf(new Date()),
    getBorrowedCountAsOf(cutoff),
  ])

  return {
    users: buildTrend(currentUsers, previousUsers),
    books: buildTrend(currentBooks, previousBooks),
    borrowed: buildTrend(currentBorrowed, previousBorrowed),
  }
}