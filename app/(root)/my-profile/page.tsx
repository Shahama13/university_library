import { auth, signOut } from '@/auth'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/sign-in')
    }

    const currentUserDetails = await db.select().from(users).where(eq(users.id, session.user.id))

    const borrowedBooks = await db
        .select({ book: books })
        .from(borrowRecords)
        .innerJoin(books, eq(borrowRecords.bookId, books.id))
        .where(eq(borrowRecords.userId, session.user.id))

    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                    redirect("/sign-in")
                }}
                className="mb-10"
            >
                <Button type="submit">Logout</Button>
            </form>

            {/* <BookList title="Borrowed Books" books={borrowedBooks.map(({ book }) => book)} containerClassName='flex-1' /> */}
        </>
    )
}

export default Page