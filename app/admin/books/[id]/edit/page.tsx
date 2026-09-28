import BookForm from '@/components/admin/forms/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBookById } from '@/lib/admin/actions/book'

interface Props {
    params: Promise<{ id: string }>
}

const Page = async ({ params }: Props) => {
    const { id } = await params
    const book = await getBookById(id)

    if (!book) notFound()

    return (
        <>
            <Button className={"back-btn"}>
                <Link href="/admin/books">←  Go back</Link>
            </Button>

            <section className="w-full max-w-2xl">
                <BookForm type="update" {...book} />
            </section>
        </>
    )
}

export default Page