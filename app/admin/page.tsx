import React from 'react'
import Link from 'next/link'
import {  TrendingUp, Plus } from 'lucide-react'
import { getAllBooks } from '@/lib/admin/actions/book'
import { getAllUsers, getUnapprovedUsers } from '@/lib/admin/actions/user'
import { getBorrowRecords } from '@/lib/admin/actions/borrowRecord'
import BookCover from '@/components/BookCover'
import TrendArrow from '@/components/admin/TrendArrow'
import { getDashboardMetrics } from '@/lib/admin/actions/metrics'
import type { Trend } from '@/lib/admin/actions/metrics'

const formatDate = (date: Date | string | null) => {
  if (!date) return '—'
  const d = new Date(date)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yy = String(d.getFullYear()).slice(-2)
  return `${dd}/${mm}/${yy}`
}

const getInitials = (name?: string | null) =>
  (name ?? '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')


const MetricCard = ({ label, trend }: { label: string; trend: Trend }) => (
    <div className="flex-1 rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-500">{label}</p>
            <TrendArrow trend={trend} />
        </div>
        <p className="mt-2 text-3xl font-semibold text-gray-900">{trend.current}</p>
    </div>
)

const EmptyState = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) => (
  <div className="flex flex-col items-center justify-center gap-2 py-14 text-center">
    {icon}
    <p className="font-medium text-gray-900">{title}</p>
    <p className="max-w-xs text-sm text-gray-400">{description}</p>
  </div>
)

const PanelHeader = ({ title, href }: { title: string; href: string }) => (
  <div className="mb-4 flex items-center justify-between">
    <h3 className="font-bold text-lg text-gray-900">{title}</h3>
    <Link href={href} className="text-sm font-semibold text-blue-900 bg-gray-50 p-2 rounded-[5px]">
      <p> View all</p>
    </Link>
  </div>
)

// ---- page ----

const Page = async () => {
 const [allBooks, allUsers, borrowRecordsData, unapprovedUsers, metrics] = await Promise.all([
    getAllBooks(),
    getAllUsers(),
    getBorrowRecords({ sort: 'records-desc' }),
    getUnapprovedUsers(),
    getDashboardMetrics(7), // last 7 days
])

  const borrowedBooksCount = borrowRecordsData.filter(
    (r) => r.borrowRecord.status === 'BORROWED'
  ).length

  const recentlyAddedBooks = [...allBooks]
    .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
    .slice(0, 6)

  const borrowRequests = borrowRecordsData
    .filter((r) => r.borrowRecord.status === 'BORROWED')
    .slice(0, 3)

  const accountRequests = unapprovedUsers.slice(0, 6)

  return (
    <div className="space-y-6">


      {/* metrics row */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <MetricCard label="Borrowed Books" trend={metrics.borrowed} />
        <MetricCard label="Total Users" trend={metrics.users} />
        <MetricCard label="Total Books" trend={metrics.books} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* left column */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <PanelHeader title="Borrow Requests" href="/admin/book-requests" />

            {borrowRequests.length === 0 ? (
              <EmptyState
                icon={
                  <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                    <TrendingUp className="h-6 w-6 text-blue-300" />
                  </div>
                }
                title="No Pending Book Requests"
                description="There are no borrow book requests awaiting your review at this time."
              />
            ) : (
              <ul className="space-y-4">
                {borrowRequests.map(({ borrowRecord, book, user }) => (
                  <li key={borrowRecord.id} className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                    {book && (
                      <BookCover
                        coverImage={book.coverUrl}
                        coverColor={book.coverColor}
                        variant="small"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-gray-900">
                        {book?.title ?? 'Unknown book'}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        By {book?.author} • {book?.genre}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-[9px] font-semibold text-gray-600">
                          {getInitials(user?.fullname)}
                        </span>
                        <span>{user?.fullname}</span>
                        <span>{formatDate(borrowRecord.createdAt)}</span>
                      </div>
                    </div>
                    
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <PanelHeader title="Account Requests" href="/admin/account-requests" />

            {accountRequests.length === 0 ? (
              <EmptyState
                icon={
                  <div className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
                    <TrendingUp className="h-6 w-6 text-blue-300" />
                  </div>
                }
                title="No Pending Account Requests"
                description="There are currently no account requests awaiting approval."
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {accountRequests.map((u) => (
                  <Link
                    key={u.id}
                    href="/admin/account-requests"
                    className="flex flex-col items-center gap-1 rounded-lg p-2 text-center bg-gray-50"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                      {getInitials(u.fullname)}
                    </span>
                    <span className="truncate text-sm font-medium text-gray-900">
                      {u.fullname}
                    </span>
                    <span className="truncate text-xs text-gray-400">{u.email}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* right column */}
        <div className="rounded-xl border border-gray-100 bg-white p-5">
          <PanelHeader title="Recently Added Books" href="/admin/books" />

          <Link
            href="/admin/books/new"
            className="mb-4 flex items-center rounded-lg font-semibold p-3 text-gray-600 bg-gray-50 gap-4"
          >
            <div className='bg-white p-2 rounded-full'>

              <Plus size={20} />
            </div>
            Add New Book
          </Link>

          <ul className="space-y-4">
            {recentlyAddedBooks.map((book) => (
              <li key={book.id}>
                <Link
                  href={`/admin/books/${book.id}`}
                  className="flex items-center gap-3 rounded-lg p-1 hover:bg-gray-50"
                >
                  <BookCover
                    coverImage={book.coverUrl}
                    coverColor={book.coverColor}
                    variant="small"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900">{book.title}</p>
                    <p className="truncate text-sm text-gray-500">
                      By {book.author} • {book.genre}
                    </p>
                    <p className="text-xs text-gray-400">{formatDate(book.createdAt)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page