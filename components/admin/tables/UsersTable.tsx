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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

interface Props {
    users: User[];
}

const formatDate = (date: Date | string | null) => {
    if (!date) return "—";
    const d = new Date(date);
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(d);
    return `${month} ${d.getDate()} ${d.getFullYear()}`;
};

const UsersTable = ({ users }: Props) => {
    if (users.length === 0) {
        return <p className="mt-7 text-gray-500">No users yet.</p>;
    }

    return (
        <div className="mt-7 w-full overflow-x-auto">
            <Table className="min-w-[720px]">
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date Joined</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>University Id No</TableHead>
                        <TableHead>University Id Card</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="bg-blue-100">
                                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                        <AvatarFallback className="text-gray-800">{getInitials(user?.fullname)} </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col">
                                        <p className="font-bold">{user.fullname}</p>
                                        <p className="font-light">{user.email}</p>
                                    </div>

                                </div>
                            </TableCell>
                            <TableCell className="text-gray-800 font-bold">{formatDate(user.createdAt)}</TableCell>
                            <TableCell className="text-gray-800">
                                <div className={cn(user.role==="USER"?"bg-pink-100":"bg-green-100", "p-1 rounded-2xl text-center")}>
                                   <p className={cn(user.role==="USER"?"text-pink-600":"text-green-800", "capitalize")}>{user.role?.toLowerCase()}</p> 
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-800">{user.universityId}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">

                                    {/* <DeleteuserButton id={user.id} title={user.title} /> */}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersTable;