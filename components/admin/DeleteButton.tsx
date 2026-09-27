"use client";

import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBook } from "@/lib/admin/actions/book";
import { deleteUser } from "@/lib/admin/actions/user";

interface Props {
    id: string;
    title: string;
    dialogDescription: string;
    type: string;
}

const DeleteButton = ({ id, title, dialogDescription, type }: Props) => {

    const handleDelete = () => {
        switch (type) {
            case "book":
                deleteBook(id)
                break;
            case "user":
                deleteUser(id)
                break;

            default:
                break;
        }
    }

        return (
            <AlertDialog>
                <AlertDialogTrigger>
                    <Trash2 className="size-4 text-red-600" />
                </AlertDialogTrigger>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete &quot;{title}&quot;?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogDescription}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    };

    export default DeleteButton;