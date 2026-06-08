import { redirect } from 'next/navigation'
import ExpenseTracker from '@/app/components/tracker/ExpenseTracker'
import { createClient } from '@/app/lib/supabase/server'
import { getAvailableMonths } from '@/app/lib/expenses'
import { getCompanionName } from '@/app/lib/companions'

type DashboardPageProps = {
  searchParams: Promise<{ page?: string; q?: string; category?: string; month?: string }>
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { page, q, category, month } = await searchParams
  const currentPage = Number(page) || 1
  const availableMonths = await getAvailableMonths()

  const displayName =
    typeof user.user_metadata?.display_name === 'string' && user.user_metadata.display_name.trim()
      ? user.user_metadata.display_name
      : (user.email ?? 'hello@pixel.com')

  const companion = getCompanionName(user.user_metadata?.companion)

  return (
    <ExpenseTracker
      displayName={displayName}
      companion={companion}
      page={currentPage}
      query={q}
      category={category}
      month={month}
      availableMonths={availableMonths}
    />
  )
}
