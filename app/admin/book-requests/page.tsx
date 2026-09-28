import SortToggle from '@/components/admin/SortToggle'
import BorrowRecordsTable from '@/components/admin/tables/BorrowRecordsTable'
import { getBorrowRecords } from '@/lib/admin/actions/borrowRecord'

interface Props{
  params: Promise<{ sort?: "records-asc" | "records-desc" }>
}

const page = async ({params}: Props) => {

  const { sort } = await params
  const borrowRecords = await getBorrowRecords({ sort })

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Borrow Book Requests</h2>

        <div className="flex items-center gap-3">
          <SortToggle type='records' displayText={true} />
        </div>
      </div>

      <BorrowRecordsTable borrowRecords={borrowRecords}/>

    </section>
  )
}

export default page