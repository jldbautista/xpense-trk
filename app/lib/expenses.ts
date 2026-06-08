import { createClient } from '@/app/lib/supabase/server'
import { categories, type Category } from '@/app/components/tracker/trackerData'

export type Expense = {
  id: string
  description: string
  category: Category
  date: string
  amount: number
}

export const EXPENSES_PAGE_SIZE = 5

export type ExpenseFilters = {
  query?: string
  category?: string
  month?: string
}

function nextMonthValue(month: string) {
  const [year, monthNumber] = month.split('-').map(Number)
  return monthNumber === 12 ? `${year + 1}-01` : `${year}-${String(monthNumber + 1).padStart(2, '0')}`
}

export async function getExpensesPage(
  page: number,
  filters: ExpenseFilters = {},
): Promise<{ expenses: Expense[]; total: number }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { expenses: [], total: 0 }

  const currentPage = Math.max(1, page)
  const from = (currentPage - 1) * EXPENSES_PAGE_SIZE
  const to = from + EXPENSES_PAGE_SIZE - 1
  const search = filters.query?.trim()
  const category = categories.includes(filters.category as Category) ? filters.category : undefined
  const month = filters.month?.match(/^\d{4}-\d{2}$/) ? filters.month : undefined

  let queryBuilder = supabase
    .from('expenses')
    .select('id, description, category, date, amount', { count: 'exact' })
    .eq('user_id', user.id)

  if (search) {
    queryBuilder = queryBuilder.ilike('description', `%${search}%`)
  }
  if (category) {
    queryBuilder = queryBuilder.eq('category', category)
  }
  if (month) {
    queryBuilder = queryBuilder.gte('date', `${month}-01`).lt('date', `${nextMonthValue(month)}-01`)
  }

  const { data, count } = await queryBuilder
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to)

  const expenses: Expense[] = (data ?? []).map((row) => ({
    id: row.id,
    description: row.description,
    category: row.category as Category,
    date: row.date,
    amount: Number(row.amount),
  }))

  return { expenses, total: count ?? 0 }
}

export type MonthOption = {
  value: string
  label: string
}

export async function getAvailableMonths(): Promise<MonthOption[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data } = await supabase
    .from('expenses')
    .select('date')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  const seen = new Set<string>()
  const months: MonthOption[] = []

  for (const row of data ?? []) {
    const value = row.date.slice(0, 7)
    if (seen.has(value)) continue
    seen.add(value)
    months.push({
      value,
      label: new Date(`${value}-01T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    })
  }

  return months
}

export type MonthlySummary = {
  spentThisMonth: number
  transactions: number
  topCategory: Category | null
  topCategoryAmount: number
  topCategoryPercent: number
  monthLabel: string
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10)
}

export async function getMonthlySummary(referenceDate = new Date()): Promise<MonthlySummary> {
  const monthLabel = referenceDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const empty: MonthlySummary = {
    spentThisMonth: 0,
    transactions: 0,
    topCategory: null,
    topCategoryAmount: 0,
    topCategoryPercent: 0,
    monthLabel,
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return empty

  const year = referenceDate.getFullYear()
  const month = referenceDate.getMonth()
  const startOfMonth = isoDate(new Date(year, month, 1))
  const startOfNextMonth = isoDate(new Date(year, month + 1, 1))

  const { data } = await supabase
    .from('expenses')
    .select('category, amount')
    .eq('user_id', user.id)
    .gte('date', startOfMonth)
    .lt('date', startOfNextMonth)

  const rows = data ?? []
  if (rows.length === 0) return empty

  const totalsByCategory = new Map<Category, number>()
  let spentThisMonth = 0

  for (const row of rows) {
    const category = row.category as Category
    const amount = Number(row.amount)
    spentThisMonth += amount
    totalsByCategory.set(category, (totalsByCategory.get(category) ?? 0) + amount)
  }

  let topCategory: Category | null = null
  let topCategoryAmount = 0
  for (const [category, amount] of totalsByCategory) {
    if (amount > topCategoryAmount) {
      topCategory = category
      topCategoryAmount = amount
    }
  }

  const topCategoryPercent = spentThisMonth > 0 ? Math.round((topCategoryAmount / spentThisMonth) * 100) : 0

  return {
    spentThisMonth,
    transactions: rows.length,
    topCategory,
    topCategoryAmount,
    topCategoryPercent,
    monthLabel,
  }
}
