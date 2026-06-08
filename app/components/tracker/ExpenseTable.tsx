import Image from 'next/image'
import Link from 'next/link'
import { categoryIcons, categoryStyles } from './trackerData'
import ExpenseActions from './ExpenseActions'
import { getExpensesPage, EXPENSES_PAGE_SIZE, type Expense } from '@/app/lib/expenses'

type ExpenseTableProps = {
  page?: number
  query?: string
  category?: string
  month?: string
}

export default async function ExpenseTable({ page = 1, query, category, month }: ExpenseTableProps) {
  const currentPage = Math.max(1, page)
  const { expenses, total } = await getExpensesPage(currentPage, { query, category, month })
  const hasFilters = Boolean(query || category || month)

  const totalPages = Math.max(1, Math.ceil(total / EXPENSES_PAGE_SIZE))
  const from = (currentPage - 1) * EXPENSES_PAGE_SIZE
  const showingFrom = total === 0 ? 0 : from + 1
  const showingTo = total === 0 ? 0 : from + expenses.length
  const emptyMessage = hasFilters
    ? 'No expenses match your filters.'
    : 'No expenses yet — add your first one above!'

  return (
    <section className="tracker-card overflow-hidden">
      <div className="hidden md:block">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b-[3px] border-[#2D2A32]/20 text-left">
              <Th className="w-[27%]">Description</Th>
              <Th className="w-[19%]">Category</Th>
              <Th className="w-[19%]">Date</Th>
              <Th className="w-[17%] text-right">Amount</Th>
              <Th className="w-[18%] text-center">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <ExpenseRow key={expense.id} expense={expense} />
            ))}
          </tbody>
        </table>

        {expenses.length === 0 && (
          <p className="px-6 py-10 text-center text-2xl font-bold text-[#2D2A32]/60">
            {emptyMessage}
          </p>
        )}
      </div>

      <ul className="divide-y-[3px] divide-[#2D2A32]/15 md:hidden">
        {expenses.map((expense) => (
          <li key={expense.id} className="p-4">
            <div className="flex items-start gap-3">
              <Image
                src={categoryIcons[expense.category]}
                alt=""
                aria-hidden="true"
                width={1254}
                height={1254}
                className="pixel-art h-12 w-12 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-2xl font-bold text-[#2D2A32]">{expense.description}</p>
                <p className="text-xl font-bold text-[#2D2A32]/70">{formatDate(expense.date)}</p>
                <span className={`mt-2 inline-block border-[3px] border-[#2D2A32] px-2 py-0.5 text-xl font-bold ${categoryStyles[expense.category]}`}>
                  {expense.category}
                </span>
              </div>
              <p className="text-2xl font-bold text-[#FF1717]">-${expense.amount.toFixed(2)}</p>
            </div>
            <div className="mt-4">
              <ExpenseActions expense={expense} />
            </div>
          </li>
        ))}

        {expenses.length === 0 && (
          <li className="px-4 py-10 text-center text-2xl font-bold text-[#2D2A32]/60">
            {emptyMessage}
          </li>
        )}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t-[3px] border-[#2D2A32]/20 px-4 py-3 sm:px-6">
        <p className="text-xl font-bold text-[#2D2A32]">
          {total === 0
            ? hasFilters
              ? 'No expenses match your filters'
              : 'No expenses yet'
            : `Showing ${showingFrom} to ${showingTo} of ${total} expenses`}
        </p>
        <div className="flex items-center gap-2">
          <PageLink page={currentPage - 1} query={query} category={category} month={month} disabled={currentPage <= 1}>
            {'<'}
          </PageLink>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PageLink key={p} page={p} query={query} category={category} month={month} active={p === currentPage}>
              {p}
            </PageLink>
          ))}
          <PageLink page={currentPage + 1} query={query} category={category} month={month} disabled={currentPage >= totalPages}>
            {'>'}
          </PageLink>
        </div>
      </div>
    </section>
  )
}

function PageLink({
  page,
  query,
  category,
  month,
  children,
  active = false,
  disabled = false,
}: {
  page: number
  query?: string
  category?: string
  month?: string
  children: React.ReactNode
  active?: boolean
  disabled?: boolean
}) {
  const className = `flex h-11 min-w-11 items-center justify-center border-[3px] border-[#2D2A32] px-3 text-2xl font-bold shadow-[2px_2px_0_#2D2A32] ${
    active ? 'bg-[#5BAE4A] text-white' : 'bg-white text-[#2D2A32]'
  } ${disabled ? 'pointer-events-none opacity-40' : ''}`

  if (disabled) {
    return (
      <span className={className} aria-disabled="true">
        {children}
      </span>
    )
  }

  const params = new URLSearchParams()
  params.set('page', String(page))
  if (query?.trim()) params.set('q', query.trim())
  if (category) params.set('category', category)
  if (month) params.set('month', month)

  return (
    <Link
      href={`/dashboard?${params.toString()}`}
      scroll={false}
      className={className}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}

function ExpenseRow({ expense }: { expense: Expense }) {
  return (
    <tr className="border-b-[3px] border-[#2D2A32]/10 last:border-b-0">
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <Image
            src={categoryIcons[expense.category]}
            alt=""
            aria-hidden="true"
            width={1254}
            height={1254}
            className="pixel-art h-12 w-12 shrink-0"
          />
          <span className="truncate text-2xl font-bold text-[#2D2A32]">{expense.description}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-block border-[3px] border-[#2D2A32] px-3 py-0.5 text-xl font-bold ${categoryStyles[expense.category]}`}>
          {expense.category}
        </span>
      </td>
      <td className="px-6 py-4 text-2xl font-bold text-[#2D2A32]">{formatDate(expense.date)}</td>
      <td className="px-6 py-4 text-right text-2xl font-bold text-[#FF1717]">-${expense.amount.toFixed(2)}</td>
      <td className="px-6 py-4">
        <ExpenseActions expense={expense} />
      </td>
    </tr>
  )
}

function Th({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`px-6 py-4 text-xl font-bold uppercase text-[#2D2A32]/80 ${className}`}>
      {children}
    </th>
  )
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
