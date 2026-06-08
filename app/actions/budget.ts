'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'

export async function setMonthlyBudget(amount: number): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in to set a budget.' }
  if (!Number.isFinite(amount) || amount <= 0) return { error: 'Enter a budget greater than $0.' }

  const { error } = await supabase
    .from('budgets')
    .upsert({ user_id: user.id, monthly_amount: amount, updated_at: new Date().toISOString() })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return {}
}
