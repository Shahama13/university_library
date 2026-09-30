import { logout } from "@/lib/actions/auth"
import { LogOut } from "lucide-react"

const LogoutBtn = () => {
    return (
        <form action={logout}>
            <button type="submit" aria-label="Logout">
                <LogOut className="text-red-500 cursor-pointer" size={20} />
            </button>
        </form>
    )
}

export default LogoutBtn