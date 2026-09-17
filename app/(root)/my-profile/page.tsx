import { signOut } from '@/auth'
import BookList from '@/components/BookList'
import { Button } from '@/components/ui/button'
import { sampleBooks } from '@/constants'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = () => {
    return (
        <>
            <form
                action={async () => {
                    "use server"
                    await signOut()
                    redirect("/sign-in")
                }}
                className="mb-10"
            >
                <Button type="submit">Logout</Button>
            </form>

            <BookList title="Borrowed Books" books={sampleBooks} />
        </>
    )
}

export default Page