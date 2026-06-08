'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { categories } from './trackerData'
import type { MonthOption } from '@/app/lib/expenses'

type ExpenseFiltersProps = {
  availableMonths: MonthOption[]
}

export default function ExpenseFilters({ availableMonths }: ExpenseFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const urlQuery = searchParams.get('q') ?? ''
  const urlCategory = searchParams.get('category') ?? ''
  const urlMonth = searchParams.get('month') ?? ''
  const hasActiveFilters = Boolean(urlQuery || urlCategory || urlMonth)

  const [search, setSearch] = useState(urlQuery)
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery)

  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery)
    setSearch(urlQuery)
  }

  const navigate = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value)
        else params.delete(key)
      }
      params.delete('page')

      const queryString = params.toString()
      startTransition(() => {
        router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false })
      })
    },
    [searchParams, pathname, router, startTransition],
  )

  useEffect(() => {
    const trimmed = search.trim()
    if (trimmed === urlQuery) return

    const timeout = setTimeout(() => navigate({ q: trimmed }), 300)
    return () => clearTimeout(timeout)
  }, [search, urlQuery, navigate])

  function handleClear() {
    setSearch('')
    startTransition(() => {
      router.replace(pathname, { scroll: false })
    })
  }

  return (
    <section className="grid gap-3 md:grid-cols-[1.2fr_0.85fr_1fr_auto]">
      <label className="sr-only" htmlFor="search-expenses">Search expenses</label>
      <input
        id="search-expenses"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search expenses..."
        className="tracker-input"
      />

      <label className="sr-only" htmlFor="filter-category">Category</label>
      <select
        id="filter-category"
        value={urlCategory}
        onChange={(e) => navigate({ category: e.target.value })}
        className="tracker-input"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <label className="sr-only" htmlFor="filter-month">Month</label>
      <select
        id="filter-month"
        value={urlMonth}
        onChange={(e) => navigate({ month: e.target.value })}
        className="tracker-input"
      >
        <option value="">All Months</option>
        {availableMonths.map((month) => (
          <option key={month.value} value={month.value}>{month.label}</option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleClear}
        disabled={!hasActiveFilters}
        className="border-[3px] border-[#2D2A32] bg-white px-5 py-2 text-xl font-bold uppercase text-[#2D2A32] shadow-[3px_3px_0_#2D2A32] disabled:pointer-events-none disabled:opacity-40"
      >
        Clear Filters
      </button>
    </section>
  )
}
