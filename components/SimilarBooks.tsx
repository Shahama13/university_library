import React from 'react'
import BookCard from './BookCard';
import Link from 'next/link';
import { cn } from "@/lib/utils"
import BookCover from './BookCover';

interface Props {
    books: Book[];
    containerClassName?: string
}

const SimilarBooks = ({  books, containerClassName }: Props) => {
    if (books.length < 1) return;

    return (
        <section className={containerClassName}>
             <h3>More Similar Books</h3>

            <ul className="book-list">
                {books.map((book) => (

                    <Link href={`/books/${book.id}`} key={book.id}>
                        <BookCover coverColor={book.coverColor} coverImage={book.coverUrl} variant='medium' />

                        <div className={cn("mt-4 xs:max-w-40 max-w-28")}>
                            <p className="book-title">{book.title}</p>
                            <p className="book-genre">{book.genre}</p>
                        </div>

                    </Link>

                ))}
            </ul>
        </section>
    );
}

export default SimilarBooks