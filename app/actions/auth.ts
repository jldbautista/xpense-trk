'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'

export async function signup(data: {
  displayName: string
  email: string
  password: string
  companion: string
}): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        display_name: data.displayName,
        companion: data.companion,
      },
    },
  })

  if (error) return { error: error.message }

  redirect('/dashboard')
}

export async function login(data: {
  email: string
  password: string
}): Promise<{ error?: string }> {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  })

  if (error) return { error: error.message }

  redirect('/dashboard')
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
