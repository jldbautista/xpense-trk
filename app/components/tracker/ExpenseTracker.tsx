import AddExpenseCard from './AddExpenseCard'
import BudgetCard from './BudgetCard'
import ExpenseFilters from './ExpenseFilters'
import ExpenseTable from './ExpenseTable'
import PixelCatCard from './PixelCatCard'
import QuickSummaryCard from './QuickSummaryCard'
import TrackerHeader from './TrackerHeader'
import type { MonthOption } from '@/app/lib/expenses'
import type { CompanionName } from '@/app/lib/companions'

type ExpenseTrackerProps = {
  displayName: string
  companion: CompanionName
  page?: number
  query?: string
  category?: string
  month?: string
  availableMonths?: MonthOption[]
}

export default function ExpenseTracker({
  displayName,
  companion,
  page = 1,
  query,
  category,
  month,
  availableMonths = [],
}: ExpenseTrackerProps) {
  return (
    <main className="min-h-screen bg-[#FFF8E8] text-[#2D2A32]">
      <TrackerHeader displayName={displayName} companion={companion} />

      <div className="mx-auto max-w-[1480px] px-4 py-8 sm:px-8">
        <header>
          <h1 className="text-5xl font-bold uppercase leading-none text-[#111111] sm:text-6xl">
            Expense Tracker
          </h1>
          <p className="mt-3 text-2xl font-bold text-[#2D2A32]">Keep track of what you spend.</p>
          <div className="mt-5 h-1 w-36 bg-[#2D2A32]" />
        </header>

        <div className="mt-7 grid items-stretch gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="xl:col-start-1 xl:row-start-1">
            <AddExpenseCard />
          </div>
          <div className="xl:col-start-1 xl:row-start-2">
            <PixelCatCard companion={companion} />
          </div>
          <div className="xl:col-start-2 xl:row-start-1">
            <BudgetCard />
          </div>
          <div className="xl:col-start-2 xl:row-start-2">
            <QuickSummaryCard />
          </div>
        </div>

        <div className="mt-8">
          <ExpenseFilters availableMonths={availableMonths} />
        </div>

        <div className="mt-7">
          <ExpenseTable page={page} query={query} category={category} month={month} />
        </div>
      </div>
    </main>
  )
}
