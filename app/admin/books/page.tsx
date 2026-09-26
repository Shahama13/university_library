import { Button } from '@/components/ui/button'
import Link from 'next/link'
import BooksTable from '@/components/admin/tables/BooksTable'
import SortToggle from '@/components/admin/SortToggle'
import { getAllBooks } from '@/lib/admin/actions/book'

interface Props {
    searchParams: Promise<{ sort?: "title-asc" | "title-desc" }>
}

const Page = async ({ searchParams }: Props) => {
    const { sort } = await searchParams
    const books = await getAllBooks({ sort })

    return (
        <section className="w-full rounded-2xl bg-white p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">All Books</h2>

                <div className="flex items-center gap-3">
                    <SortToggle type='title' />

                    <Button className="bg-blue-900 text-white hover:text-black hover:bg-blue-100">
                        <Link href={"/admin/books/new"}>
                            ＋ Create a New Book
                        </Link>
                    </Button>
                </div>
            </div>

            <BooksTable books={books} />
        </section>
    )
}

export default Page