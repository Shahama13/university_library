import SortToggle from '@/components/admin/SortToggle'
import AccountRequestsTable from '@/components/admin/tables/AccountRequestsTable'
import { getUnapprovedUsers } from '@/lib/admin/actions/user'

interface Props {
    searchParams: Promise<{ sort?: "user-asc" | "user-desc" }>
}

const page = async ({ searchParams }: Props) => {
    const { sort } = await searchParams
    const users = await getUnapprovedUsers({ sort })

    return (
        <section className="w-full rounded-2xl bg-white p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">Account Registration Requests</h2>

                <div className="flex items-center gap-3">
                    <SortToggle type='user' displayText={true}/>

                </div>
            </div>

            <AccountRequestsTable users={users}/>
        </section>
    )
}

export default page