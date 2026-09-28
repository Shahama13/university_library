import Link from "next/link";
import { SquarePen } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BookCoverThumbnail from "@/components/admin/BookCoverThumbnail";
import DeleteButton from "@/components/admin/DeleteButton";
import BookCover from "../../BookCover";
import { formatDate } from "@/lib/formatDate";
interface Props {
    books: Book[];
}

const BooksTable = ({ books }: Props) => {
    if (books.length === 0) {
        return <p className="mt-7 text-gray-500">No books yet.</p>;
    }

    return (
        <div className="mt-7 w-full overflow-x-auto">
            <Table className="min-w-[720px]">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Date Created</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>
                                <Link
                                    href={`/admin/books/${book.id}`}
                                    className="flex items-center gap-3"
                                >
                                    <BookCover
                                        coverImage={book.coverUrl}
                                        coverColor={book.coverColor}
                                        variant="extraSmall"
                                        key={book.title}
                                    />
                                    <span className="font-semibold text-gray-900 hover:underline">
                                        {book.title}
                                    </span>
                                </Link>
                            </TableCell>
                            <TableCell className="text-gray-600">{book.author}</TableCell>
                            <TableCell className="text-gray-600">{book.genre}</TableCell>
                            <TableCell className="text-gray-600">{formatDate(book.createdAt)}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/admin/books/${book.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800"
                                        aria-label={`Edit ${book.title}`}
                                    >
                                        <SquarePen className="size-4" />
                                    </Link>
                                    <DeleteButton
                                        id={book.id}
                                        title={book.title}
                                        type={"book"}
                                        dialogDescription={"This removes the book and its borrow history. This can't be undone."}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div >
    );
};

export default BooksTable;