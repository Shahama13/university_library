"use client"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateBorrowRecord } from "@/lib/admin/actions/borrowRecord"
import { cn } from "cn"
import { useRouter } from "next/navigation"

type Status = "BORROWED" | "RETURNED" | "LATE_RETURNED";

const statusStyles = {
    BORROWED: {
        bg: "bg-purple-100",
        text: "text-purple-600",
    },
    RETURNED: {
        bg: "bg-cyan-100",
        text: "text-cyan-800",
    },
    LATE_RETURNED: {
        bg: "bg-red-100",
        text: "text-red-800",
    },
}

function StatusBadge({ status }: { status: Status }) {
    const styles = statusStyles[status]

    return (
        <div
            className={cn(
                "rounded-2xl py-1 px-2 text-center",
                styles.bg
            )}
        >
            <p
                className={cn(
                    "font-semibold capitalize",
                    styles.text
                )}
            >
                {status.toLowerCase()?.split("_").join(" ")}
            </p>
        </div>
    )
}

export function BorrowStatusDropdown({ status, id }: { status: Status; id: string }) {
    const router = useRouter()

    const handleRoleChange = async (newStatus: Status) => {
        await updateBorrowRecord(newStatus, id)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <button type="button">
                        <StatusBadge status={status} />
                    </button>
                }
            />

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                        checked={status === "BORROWED"}
                        onClick={() => handleRoleChange("BORROWED")}
                    >
                        <StatusBadge status="BORROWED" />
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={status === "RETURNED"}
                        onClick={() => handleRoleChange("RETURNED")}
                    >
                        <StatusBadge status="RETURNED" />
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={status === "LATE_RETURNED"}
                        onClick={() => handleRoleChange("LATE_RETURNED")}
                    >
                        <StatusBadge status="LATE_RETURNED" />
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}