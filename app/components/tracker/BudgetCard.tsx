import Image from 'next/image'
import { getMonthlyBudget } from '@/app/lib/budget'
import { getMonthlySummary } from '@/app/lib/expenses'
import BudgetEditor from './BudgetEditor'

export default async function BudgetCard() {
  const [budgetAmount, summary] = await Promise.all([getMonthlyBudget(), getMonthlySummary()])

  const amount = budgetAmount ?? 0
  const spent = summary.spentThisMonth
  const usedPercent = amount > 0 ? Math.min(100, Math.round((spent / amount) * 100)) : 0
  const remaining = Math.max(0, amount - spent)

  return (
    <section className="tracker-card p-5 sm:p-6">
      <div className="relative flex h-16 items-start justify-between gap-5 overflow-visible">
        <div className="min-w-0">
          <h2 className="text-3xl font-bold uppercase leading-none text-[#168C2D]">Budget</h2>
          <p className="mt-2 text-2xl font-bold leading-none text-[#2D2A32]">{summary.monthLabel}</p>
        </div>
        <div className="relative h-16 w-28 shrink-0 overflow-visible" aria-hidden="true">
          <Image
            src="/piggy-bank.png"
            alt=""
            width={1254}
            height={1254}
            className="pixel-art absolute -right-1 -top-5 h-24 w-24 sm:-top-7 sm:h-28 sm:w-28"
          />
        </div>
      </div>

      {budgetAmount ? (
        <>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <BudgetStat label="Monthly" value={`$${amount.toFixed(2)}`} color="text-[#2D2A32]" />
            <BudgetStat label="Spent" value={`$${spent.toFixed(2)}`} color="text-[#E76F51]" />
            <BudgetStat label="Left" value={`$${remaining.toFixed(2)}`} color="text-[#168C2D]" />
          </div>

          <div className="mt-5">
            <div className="h-6 border-[3px] border-[#2D2A32] bg-white">
              <div className="h-full bg-[#5BAE4A]" style={{ width: `${usedPercent}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-xl font-bold leading-none text-[#2D2A32]">
              <span>{usedPercent}% used</span>
              <span>{100 - usedPercent}% remaining</span>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-5 text-2xl font-bold text-[#2D2A32]/60">
          Set a monthly budget to start tracking your spending.
        </p>
      )}

      <BudgetEditor currentAmount={budgetAmount} />
    </section>
  )
}

function BudgetStat({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="border-[3px] border-[#2D2A32] bg-[#FFF8E8] px-3 py-2 text-center">
      <p className="text-xl font-bold uppercase leading-none text-[#2D2A32]/70">{label}</p>
      <p className={`mt-1 text-3xl font-bold leading-none ${color}`}>{value}</p>
    </div>
  )
}
