"use client"
import { updateUserStatus } from '@/lib/admin/actions/user'
import { CircleX } from 'lucide-react'

const ApproveRejectUser = ({id}:{id:string}) => {

    const handleApproveUser = () => {
        updateUserStatus("APPROVED", id)
    }
    const handleRejectUser = () => {
        updateUserStatus("REJECTED", id)
    }

    return (
        <div className="flex flex-row gap-3 items-center">

            <div className="bg-green-100 p-2 px-4 rounded-[5px] text-center cursor-pointer" onClick={handleApproveUser}>
                <p className="text-green-800 capitalize font-semibold">Approve Account</p>
            </div>

            <CircleX className="text-red-400 cursor-pointer" size={20} onClick={handleRejectUser} />

        </div>
    )

}

export default ApproveRejectUser