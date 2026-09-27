"use client"
import { updateUserStatus } from '@/lib/admin/actions/user'
import { CircleX, CheckCircle2, AlertCircle, X } from 'lucide-react'
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

const ApproveRejectUser = ({ id }: { id: string }) => {

    const handleApproveUser = () => {
        updateUserStatus("APPROVED", id)
    }
    const handleRejectUser = () => {
        updateUserStatus("REJECTED", id)
    }

    return (
        <div className="flex flex-row gap-3 items-center">

            {/* Approve dialog */}
            <AlertDialog>
                <AlertDialogTrigger >
                    <div className="bg-green-100 p-2 px-4 rounded-[5px] text-center cursor-pointer">
                        <p className="text-green-800 capitalize font-semibold">Approve Account</p>
                    </div>
                </AlertDialogTrigger>

                <AlertDialogContent className="max-w-md p-8 pt-6">
                    <AlertDialogCancel
                        className="absolute right-5 top-5 rounded-sm opacity-70 hover:opacity-100 transition-opacity"

                    >
                        <X className="h-5 w-5 text-slate-900" />
                    </AlertDialogCancel>

                    <AlertDialogHeader className="flex flex-col items-center justify-center gap-4 text-center sm:text-center">
                        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-600">
                                <CheckCircle2 className="h-9 w-9 text-white" strokeWidth={2} />
                            </div>
                        </div>

                        <AlertDialogTitle className="text-xl font-bold text-slate-900">
                            Approve Account Request
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500">
                            Approve the student&apos;s account request and grant access. A confirmation email will be sent upon approval.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-2">
                        <AlertDialogAction
                            onClick={handleApproveUser}
                            className="w-full bg-green-700! hover:bg-green-800! text-white hover:text-white! cursor-pointer font-semibold py-6 rounded-lg"
                        >
                            Approve &amp; Send Confirmation
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Reject dialog */}
            <AlertDialog>
                <AlertDialogTrigger >
                    <CircleX className="text-red-400 cursor-pointer" size={20} />
                </AlertDialogTrigger>

                <AlertDialogContent className="max-w-md p-8 pt-6">
                    <AlertDialogCancel className="absolute right-5 top-5 rounded-sm opacity-70 hover:opacity-100 transition-opacity">

                        <X className="h-5 w-5 text-slate-900" />
                    </AlertDialogCancel>

                    <AlertDialogHeader className="flex flex-col items-center gap-4 text-center sm:text-center">
                        <div className="flex items-center justify-center h-24 w-24 rounded-full bg-red-100">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-400">
                                <AlertCircle className="h-9 w-9 text-white" strokeWidth={2} />
                            </div>
                        </div>

                        <AlertDialogTitle className="text-xl font-bold text-slate-900">
                            Deny Account Request
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-500">
                            Denying this request will notify the student they&apos;re not eligible due to unsuccessful ID card verification.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className="mt-2">
                        <AlertDialogAction
                            onClick={handleRejectUser}
                            className="w-full bg-red-400! hover:bg-red-500! hover:text-white! cursor-pointer text-white font-semibold py-6 rounded-lg"
                        >
                            Deny &amp; Notify Student
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )

}

export default ApproveRejectUser