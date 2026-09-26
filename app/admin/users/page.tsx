import SortToggle from '@/components/admin/SortToggle'
import UsersTable from '@/components/admin/tables/UsersTable'
import { getAllUsers } from '@/lib/admin/actions/book'
import React from 'react'

interface Props{
    searchParams: Promise<{ sort?: "user-asc" | "user-desc" }>
}

const page = async({searchParams}:Props) => {
   const { sort } = await searchParams
    const users = await getAllUsers({ sort })

    return (
        <section className="w-full rounded-2xl bg-white p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">All Users</h2>

                <div className="flex items-center gap-3">
                    <SortToggle type='user' />

                </div>
            </div>

            <UsersTable users={users} />
        </section>
    )
}

export default page