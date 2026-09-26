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
import { Button } from "../ui/button";

interface Props {
    id: string;
    title: string;
}

const DeleteBookButton = ({ id, title }: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>

                <Trash2 className="size-4 text-red-600" />

            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete &quot;{title}&quot;?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This removes the book and its borrow history. This can&apos;t be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteBook(id)}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteBookButton;