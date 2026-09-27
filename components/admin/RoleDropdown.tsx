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

export function RoleDropdown({ role, id }: { role: string, id: string }) {
    const router = useRouter()

    const handleRoleChange = async (newRole: "USER" | "ADMIN") => {
        await updateUserRole(newRole, id)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <button
                        type="button"
                        className={cn(
                            role === "USER" ? "bg-pink-100" : "bg-green-100",
                            "p-1 rounded-2xl text-center w-16"
                        )}
                    >
                        <p
                            className={cn(
                                role === "USER"
                                    ? "text-pink-600"
                                    : "text-green-800",
                                "capitalize font-semibold"
                            )}
                        >
                            {role?.toLowerCase()}
                        </p>
                    </button>
                }
            />

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                        checked={role === "USER"}
                        onClick={() => handleRoleChange("USER")}
                    >
                        <div className="w-16 rounded-2xl bg-pink-100 p-1 text-center">
                            <p className="font-semibold capitalize text-pink-600">
                                user
                            </p>
                        </div>
                    </DropdownMenuCheckboxItem>

                    <DropdownMenuCheckboxItem
                        checked={role === "ADMIN"}
                        onClick={() => handleRoleChange("ADMIN")}
                    >
                        <div className="w-16 rounded-2xl bg-green-100 p-1 text-center">
                            <p className="font-semibold capitalize text-green-800">
                                admin
                            </p>
                        </div>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}