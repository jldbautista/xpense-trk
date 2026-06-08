'use client'

import { useState } from 'react'
import { setMonthlyBudget } from '@/app/actions/budget'

type BudgetEditorProps = {
  currentAmount: number | null
}

export default function BudgetEditor({ currentAmount }: BudgetEditorProps) {
  const [amount, setAmount] = useState(currentAmount && currentAmount > 0 ? currentAmount.toFixed(2) : '')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    const parsedAmount = Number(amount)
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return setError('Enter a budget greater than $0.')
    }

    setPending(true)
    const result = await setMonthlyBudget(parsedAmount)
    setPending(false)

    if (result?.error) {
      setError(result.error)
      return
    }

    setSuccess('Budget updated!')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 flex flex-wrap items-end gap-3">
      <div>
        <label htmlFor="monthly-budget" className="mb-1 block text-xl font-bold uppercase leading-none text-[#2D2A32]">
          {currentAmount ? 'Update Monthly Budget' : 'Set Monthly Budget'}
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-[#2D2A32]">$</span>
          <input
            id="monthly-budget"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="500.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tracker-input pl-11!"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="border-[3px] border-[#2D2A32] bg-[#5BAE4A] px-5 py-2 text-xl font-bold uppercase text-white shadow-[3px_3px_0_#2D2A32] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#2D2A32] disabled:pointer-events-none disabled:opacity-60"
      >
        {pending ? 'Saving…' : 'Save'}
      </button>

      {error && (
        <p className="w-full text-lg font-bold text-[#FF1717]" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="w-full text-lg font-bold text-[#168C2D]" role="status">
          {success}
        </p>
      )}
    </form>
  )
}
