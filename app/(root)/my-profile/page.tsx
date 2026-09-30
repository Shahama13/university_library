import { auth, signOut } from '@/auth'
import ProfileCard from '@/components/ProfileCard'
import BorrowedBookCard from '@/components/BorrowedBookCard'
import { db } from '@/database/drizzle'
import { books, borrowRecords, users } from '@/database/schema'
import { desc, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

const Page = async () => {
    const session = await auth()

    if (!session?.user?.id) {
        redirect('/sign-in')
    }

    const [currentUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, session.user.id))

    if (!currentUser) redirect('/sign-in')

    const borrowedBooks = await db
        .select({
            id: books.id,
            title: books.title,
            genre: books.genre,
            coverColor: books.coverColor,
            coverUrl: books.coverUrl,
            borrowDate: borrowRecords.borrowDate,
            dueDate: borrowRecords.dueDate,
            returnDate: borrowRecords.returnDate,
            status: borrowRecords.status,
        })
        .from(borrowRecords)
        .innerJoin(books, eq(borrowRecords.bookId, books.id))
        .where(eq(borrowRecords.userId, session.user.id))
        .orderBy(desc(borrowRecords.borrowDate))

    return (
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start max-w-8xl">
            <ProfileCard
                fullName={currentUser.fullname}
                email={currentUser.email}
                universityId={currentUser.universityId}
                universityCard={currentUser.universityCard}
            />

            <div className="flex flex-1 flex-col gap-5">
                <div className="flex items-center justify-between">
                    <h2 className="font-bebas-neue text-3xl text-light-100">
                        Borrowed books
                    </h2>
                </div>

                {borrowedBooks.length > 0 ? (
                    <ul className="flex flex-row gap-5 flex-wrap">
                        {borrowedBooks.map((item) => (
                            <BorrowedBookCard key={item.id} {...item} />
                        ))}
                    </ul>
                ) : (
                    <p className="text-light-100">
                        You haven&apos;t borrowed any books yet.
                    </p>
                )}
            </div>
        </div>
    )
}

export default Page