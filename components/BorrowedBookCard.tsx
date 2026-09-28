import Link from "next/link";
import { Image, ImageKitProvider } from "@imagekit/next";
import { BookOpen, CalendarDays, CircleAlert, CircleCheck, Receipt } from "lucide-react";
import config from "@/lib/config";
import BookCover from "./BookCover";
import { getCoverGradient } from "@/lib/coverGradient";
import { formatDate } from "@/lib/formatDate";

interface Props {
    id: string;
    title: string;
    genre: string;
    coverColor: string;
    coverUrl: string; // ImageKit path
    borrowDate: Date | string;
    dueDate: string;
    returnDate: string | null;
    status: "BORROWED" | "RETURNED";
}

const BorrowedBookCard = ({
    id,
    title,
    genre,
    coverColor,
    coverUrl,
    borrowDate,
    dueDate,
    returnDate,
    status,
}: Props) => {
    const daysLeft = Math.ceil(
        (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    const isReturned = status === "RETURNED";
    const isOverdue = !isReturned && daysLeft < 0;

    return (
        <div className="borrowed-book">
            {isOverdue && (
                <div className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-dark-100">
                    <CircleAlert className="size-4 text-red-500" />
                </div>
            )}


            <Link
                href={`/books/${id}`}
                className="borrowed-book_cover"
                style={{ backgroundImage: getCoverGradient(coverColor), padding: 50 }}
            >
                <BookCover coverColor={coverColor} variant="medium" coverImage={coverUrl} />
            </Link>

            <p className="book-title">{title}</p>
            <p className="book-genre">{genre}</p>

            <div className="mt-3 flex flex-col gap-1.5 text-xs text-light-100">
                <p className="flex items-center gap-1.5">
                    <BookOpen className="size-3.5" />
                    Borrowed on {formatDate(borrowDate)}
                </p>

                {isReturned ? (
                    <p className="flex items-center gap-1.5 text-green-500">
                        <CircleCheck className="size-3.5" />
                        Returned on {formatDate(returnDate!)}
                    </p>
                ) : isOverdue ? (
                    <p className="flex items-center gap-1.5 text-red-500">
                        <CircleAlert className="size-3.5" />
                        Overdue Return
                    </p>
                ) : (
                    <p className="flex items-center gap-1.5">
                        <CalendarDays className="size-3.5" />
                        {daysLeft} days left to due
                    </p>
                )}
            </div>

            <Link
                href={`/books/${id}/receipt`}
                className="absolute bottom-5 right-5 flex size-7 items-center justify-center rounded-md bg-dark-500 text-primary"
            >
                <Receipt className="size-4" />
            </Link>
        </div>
    );
};

export default BorrowedBookCard;