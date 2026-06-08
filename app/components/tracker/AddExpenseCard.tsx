'use client'

import { useState } from 'react'
import { categories, type Category } from './trackerData'
import { addExpense } from '@/app/actions/expenses'

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export default function AddExpenseCard() {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<Category>('Food')
  const [date, setDate] = useState(todayISO())
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    const parsedAmount = Number(amount)
    if (!description.trim()) return setError('Description is required.')
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return setError('Enter an amount greater than $0.')
    }
    if (!date) return setError('Date is required.')

    setPending(true)
    const result = await addExpense({ amount: parsedAmount, description, category, date })
    setPending(false)

    if (result?.error) {
      setError(result.error)
      return
    }

    setSuccess('Expense added!')
    setAmount('')
    setDescription('')
    setCategory('Food')
    setDate(todayISO())
  }

  return (
    <section className="tracker-card flex h-full flex-col p-5 sm:p-6">
      <h2 className="text-3xl font-bold uppercase leading-none text-[#168C2D]">Add Expense</h2>

      <form
        id="add-expense-form"
        onSubmit={handleSubmit}
        noValidate
        className="mt-5 grid flex-1 gap-4 md:grid-cols-2"
        aria-label="Add expense form"
      >
        <Field label="Amount" id="amount">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-[#2D2A32]">$</span>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="tracker-input pl-11!"
            />
          </div>
        </Field>

        <Field label="Description" id="description">
          <input
            id="description"
            placeholder="What did you buy?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="tracker-input"
          />
        </Field>

        <Field label="Category" id="category">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="tracker-input"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Date" id="date">
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="tracker-input"
          />
        </Field>
      </form>

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          type="submit"
          form="add-expense-form"
          disabled={pending}
          className="border-[3px] border-[#2D2A32] bg-[#5BAE4A] px-6 py-2 text-2xl font-bold uppercase text-white shadow-[4px_4px_0_#2D2A32] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#2D2A32] disabled:pointer-events-none disabled:opacity-60"
        >
          {pending ? 'Adding…' : '+ Add Expense'}
        </button>

        {error && (
          <p className="text-lg font-bold text-[#FF1717]" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-lg font-bold text-[#168C2D]" role="status">
            {success}
          </p>
        )}
      </div>
    </section>
  )
}

function Field({
  label,
  id,
  children,
}: {
  label: string
  id: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xl font-bold uppercase leading-none text-[#2D2A32]">
        {label}
      </label>
      {children}
    </div>
  )
}
