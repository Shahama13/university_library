import { Receipt, ScrollText, SquareArrowOutUpRight, SquarePen } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import DeleteButton from "../DeleteButton";
import { getImageKitUrl } from "@/lib/imagekitUrl";
import { RoleDropdown } from "../RoleDropdown";
import { formatDate } from "@/lib/formatDate";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { BorrowStatusDropdown } from "../BorrowStatusDropdown";

interface BorrowRecordData {
    borrowRecord: BorrowRecord,
    book: Book | null;
    user: Partial<User> | null;
}

interface Props {
    borrowRecords: BorrowRecordData[];
}

const BorrowRecordsTable = ({ borrowRecords }: Props) => {
    if (borrowRecords.length === 0) {
        return <p className="mt-7 text-gray-500">No books borrowed yet.</p>;
    }

    return (
        <div className="mt-7 w-full overflow-x-auto">
            <Table className="min-w-180">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>User Requested</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Borrowed Date</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Receipt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {borrowRecords.map((rec) => (
                        <TableRow key={rec.borrowRecord.id}>
                            <TableCell>
                                <Link
                                    href={`/admin/books/${rec.book?.id}`}
                                    className="flex items-center gap-3"
                                >
                                    <BookCover
                                        coverImage={rec.book?.coverUrl!}
                                        coverColor={rec.book?.coverColor!}
                                        variant="extraSmall"
                                        key={rec.book?.title!}
                                    />
                                    <span className="font-semibold text-gray-900 hover:underline">
                                        {rec.book?.title}
                                    </span>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="bg-blue-100">
                                        <AvatarFallback className="text-gray-800">{getInitials(rec?.user?.fullname!)} </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col">
                                        <p className="font-bold">{rec?.user?.fullname}</p>
                                        <p className="font-light">{rec?.user?.email}</p>
                                    </div>

                                </div>
                            </TableCell>
                            <TableCell className="text-gray-800">
                                <BorrowStatusDropdown id={rec.borrowRecord.id} status={rec.borrowRecord.status}/>
                            </TableCell>
                            <TableCell className="text-gray-800 font-semibold">{formatDate(rec.borrowRecord.borrowDate)}</TableCell>
                            <TableCell className="text-gray-800 font-semibold">{formatDate(rec.borrowRecord.returnDate)}</TableCell>
                            <TableCell className="text-gray-800 font-semibold">{formatDate(rec.borrowRecord.dueDate)}</TableCell>

                            <TableCell>
                                <div className="rounded-[5px] text-center bg-blue-50 cursor-pointer flex flex-row justify-evenly py-2">
                                    <ScrollText className="text-indigo-950" size={20}/>
                                    <p className="text-indigo-950">Generate</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BorrowRecordsTable;