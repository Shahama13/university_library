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
import DeleteBookButton from "@/components/admin/DeleteBookButton";
import BookCover from "../../BookCover";

interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    coverUrl: string;
    coverColor: string;
    createdAt: Date | string | null;
}

interface Props {
    books: Book[];
}

const formatDate = (date: Date | string | null) => {
    if (!date) return "—";
    const d = new Date(date);
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
    return `${month} ${d.getDate()} ${d.getFullYear()}`;
};

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
                                <div className="flex items-center gap-3">
                                    {/* <BookCoverThumbnail
                    coverUrl={book.coverUrl}
                    coverColor={book.coverColor}
                    title={book.title}
                  /> */}
                                    <BookCover coverImage={book.coverUrl} coverColor={book.coverColor} variant="extraSmall" key={book.title} />
                                    <span className="font-semibold text-gray-900">{book.title}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{book.author}</TableCell>
                            <TableCell className="text-gray-600">{book.genre}</TableCell>
                            <TableCell className="text-gray-600">{formatDate(book.createdAt)}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/admin/books/${book.id}`}
                                        className="text-blue-600 hover:text-blue-800"
                                        aria-label={`Edit ${book.title}`}
                                    >
                                        <SquarePen className="size-4" />
                                    </Link>
                                    <DeleteBookButton id={book.id} title={book.title} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BooksTable;