import Image from 'next/image'
import { categoryIcons } from './trackerData'
import { getMonthlySummary } from '@/app/lib/expenses'

export default async function QuickSummaryCard() {
  const summary = await getMonthlySummary()

  return (
    <section className="tracker-card h-full p-5 sm:p-6">
      <h2 className="text-3xl font-bold uppercase leading-none text-[#168C2D]">Quick Summary</h2>

      <div className="mt-6 grid gap-5 md:grid-cols-3 md:gap-0 md:divide-x-[3px] md:divide-dashed md:divide-[#2D2A32]/20">
        <SummaryColumn title="Spent This Month" accent="text-[#168C2D]">
          <p className="min-h-14 text-5xl font-bold leading-none text-[#168C2D]">
            ${summary.spentThisMonth.toFixed(2)}
          </p>
          <p className="text-2xl font-bold leading-none text-[#2D2A32]">{summary.monthLabel}</p>
          <div className="relative flex h-28 items-center justify-center">
            <Image
              src="/coin-stack.png"
              alt=""
              aria-hidden="true"
              width={1254}
              height={1254}
              className="pixel-art h-24 w-24"
            />
            <Image
              src="/glitter.png"
              alt=""
              aria-hidden="true"
              width={1254}
              height={1254}
              className="pixel-art absolute right-[18%] top-2 h-8 w-8"
            />
          </div>
        </SummaryColumn>

        <SummaryColumn title="Transactions" accent="text-[#1F6FE5]">
          <p className="min-h-14 text-6xl font-bold leading-none text-[#1F6FE5]">{summary.transactions}</p>
          <p className="text-2xl font-bold leading-none text-[#2D2A32]">{summary.monthLabel}</p>
          <div className="flex h-28 items-center justify-center">
            <Image
              src="/scroll.png"
              alt=""
              aria-hidden="true"
              width={1254}
              height={1254}
              className="pixel-art h-24 w-24"
            />
          </div>
        </SummaryColumn>

        <SummaryColumn title="Top Category" accent="text-[#8E43D9]">
          <div className="flex min-h-14 items-center justify-center gap-3">
            {summary.topCategory ? (
              <>
                <Image
                  src={categoryIcons[summary.topCategory]}
                  alt=""
                  aria-hidden="true"
                  width={1254}
                  height={1254}
                  className="pixel-art h-16 w-16"
                />
                <p className="text-3xl font-bold text-[#2D2A32]">{summary.topCategory}</p>
              </>
            ) : (
              <p className="text-3xl font-bold text-[#2D2A32]/60">No spending yet</p>
            )}
          </div>
          <p className="text-4xl font-bold leading-none text-[#8E43D9]">
            ${summary.topCategoryAmount.toFixed(2)}
          </p>
          <div className="flex h-28 items-start justify-center pt-1">
            <p className="text-2xl font-bold leading-none text-[#2D2A32]">{summary.topCategoryPercent}% of total</p>
          </div>
        </SummaryColumn>
      </div>
    </section>
  )
}

function SummaryColumn({
  title,
  accent,
  children,
}: {
  title: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-64 grid-rows-[auto_1fr_auto_auto] items-start gap-3 px-0 text-center md:px-5">
      <h3 className={`min-h-12 text-2xl font-bold uppercase leading-none ${accent}`}>{title}</h3>
      <div className="contents">
        {children}
      </div>
    </div>
  )
}
