import { createClient } from '@/app/lib/supabase/server'

export async function getMonthlyBudget(): Promise<number | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('budgets')
    .select('monthly_amount')
    .eq('user_id', user.id)
    .maybeSingle()

  return data ? Number(data.monthly_amount) : null
}
