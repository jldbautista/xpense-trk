'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/app/lib/supabase/server'
import { categories, type Category } from '@/app/components/tracker/trackerData'

type ExpenseInput = {
  amount: number
  description: string
  category: Category
  date: string
}

function validateExpenseInput(data: ExpenseInput): { error?: string; description: string } {
  const description = data.description.trim()
  if (!description) return { error: 'Description is required.', description }
  if (!Number.isFinite(data.amount) || data.amount <= 0) {
    return { error: 'Enter an amount greater than $0.', description }
  }
  if (!categories.includes(data.category)) return { error: 'Select a valid category.', description }
  if (!data.date) return { error: 'Date is required.', description }

  return { description }
}

export async function addExpense(data: ExpenseInput): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in to add an expense.' }

  const { error: validationError, description } = validateExpenseInput(data)
  if (validationError) return { error: validationError }

  const { error } = await supabase.from('expenses').insert({
    user_id: user.id,
    description,
    category: data.category,
    amount: data.amount,
    date: data.date,
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return {}
}

export async function updateExpense(id: string, data: ExpenseInput): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in to edit an expense.' }

  const { error: validationError, description } = validateExpenseInput(data)
  if (validationError) return { error: validationError }

  const { error } = await supabase
    .from('expenses')
    .update({
      description,
      category: data.category,
      amount: data.amount,
      date: data.date,
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return {}
}

export async function deleteExpense(id: string): Promise<{ error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in to delete an expense.' }

  const { error } = await supabase.from('expenses').delete().eq('id', id).eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return {}
}
