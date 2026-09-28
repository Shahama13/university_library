import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Pencil } from 'lucide-react'
import { getBookById } from '@/lib/admin/actions/book'
import BookCover from '@/components/BookCover'
import BookVideo from '@/components/BookVideo'
import { Button } from '@/components/ui/button'

interface BookPageProps {
    params: Promise<{ id: string }>
}

const BookPage = async ({ params }: BookPageProps) => {
    const { id } = await params

    const book = await getBookById(id)

    if (!book) {
        notFound()
    }

    const {
        id: bookId,
        title,
        author,
        genre,
        summary,
        coverUrl,
        videoUrl,
        coverColor,
        createdAt,
    } = book

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
        })
        : '—'

    return (
        <div className="min-h-screen">
            <Button className={"back-btn"}>
                <Link href="/admin/books">←  Go back</Link>
            </Button>

            <div className="flex flex-col gap-6 md:flex-row">
                <div
                    className="flex w-full shrink-0 items-center justify-center rounded-xl px-6 py-8 sm:px-12 md:w-auto md:px-20 lg:px-28"
                    style={{ backgroundColor: `${coverColor}60` }}
                >
                    <BookCover coverColor={coverColor} coverImage={coverUrl} key={bookId} variant='medium' />
                </div>

                <div className="flex w-full flex-col justify-between gap-3 md:w-1/3 md:max-w-sm">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Created at:</span>
                        <Calendar className="h-4 w-4" />
                        <span>{formattedDate}</span>
                    </div>

                    <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h1>
                    <p className="font-semibold text-slate-800">By {author}</p>
                    <p className="text-slate-500">{genre}</p>

                    <Link
                        href={`/admin/books/${id}/edit`}
                        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-100 hover:text-black!"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Book
                    </Link>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:mt-10 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                    <h2 className="mb-3 font-semibold text-slate-900">Summary</h2>
                    <div className="space-y-4 text-slate-600">
                        {summary
                            .split('\n\n')
                            .filter(Boolean)
                            .map((paragraph: string, i: number) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                    </div>
                </div>

                {videoUrl && (
                    <div className="w-full">
                        <h2 className="mb-3 font-semibold text-slate-900">Video</h2>
                        <BookVideo videoUrl={videoUrl} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default BookPage