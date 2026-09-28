import Link from "next/link";
import { CircleX, SquareArrowOutUpRight, SquarePen } from "lucide-react";
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
import ApproveRejectUser from "../ApproveRejectUser";
import { formatDate } from "@/lib/formatDate";


interface Props {
    users: User[];
}

const AccountRequestsTable = ({ users }: Props) => {
    if (users.length === 0) {
        return <p className="mt-7 text-gray-500">No users requests yet.</p>;
    }

    return (
        <div className="mt-7 w-full overflow-x-auto">
            <Table className="">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date Joined</TableHead>
                        <TableHead>University Id No</TableHead>
                        <TableHead>University Id Card</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="bg-blue-100">
                                        <AvatarFallback className="text-gray-800">{getInitials(user?.fullname)} </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col">
                                        <p className="font-bold">{user.fullname}</p>
                                        <p className="font-light">{user.email}</p>
                                    </div>

                                </div>
                            </TableCell>
                            <TableCell className="text-gray-800 font-bold">{formatDate(user.createdAt)}</TableCell>

                            <TableCell className="text-gray-800 font-semibold">{user.universityId}</TableCell>
                            <TableCell>
                                <a
                                    href={getImageKitUrl(user.universityCard)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-fit items-center gap-2 text-blue-500 font-semibold"
                                >
                                    View ID Card
                                    <SquareArrowOutUpRight size={16} />
                                </a>
                            </TableCell>

                            <TableCell>
                                <ApproveRejectUser id={user.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AccountRequestsTable;