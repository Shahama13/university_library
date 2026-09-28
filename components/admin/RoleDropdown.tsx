"use client"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { updateUserRole } from "@/lib/admin/actions/user"
import { cn } from "cn"
import { useRouter } from "next/navigation"

type Role = "USER" | "ADMIN"

const roleStyles = {
    USER: {
        bg: "bg-pink-100",
        text: "text-pink-600",
    },
    ADMIN: {
        bg: "bg-green-100",
        text: "text-green-800",
    },
}

function RoleBadge({ role }: { role: Role }) {
    const styles = roleStyles[role]

    return (
        <div
            className={cn(
                "w-16 rounded-2xl p-1 text-center",
                styles.bg
            )}
        >
            <p
                className={cn(
                    "font-semibold capitalize",
                    styles.text
                )}
            >
                {role.toLowerCase()}
            </p>
        </div>
    )
}

export function RoleDropdown({ role, id }: { role: Role; id: string }) {
    const router = useRouter()

    const handleRoleChange = async (newRole: Role) => {
        await updateUserRole(newRole, id)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <button type="button">
                        <RoleBadge role={role} />
                    </button>
                }
            />

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                        checked={role === "USER"}
                        onClick={() => handleRoleChange("USER")}
                    >
                        <RoleBadge role="USER" />
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={role === "ADMIN"}
                        onClick={() => handleRoleChange("ADMIN")}
                    >
                        <RoleBadge role="ADMIN" />
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}