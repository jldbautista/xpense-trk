'use client'

import { useState } from 'react'
import { categories, type Category } from './trackerData'
import { updateExpense, deleteExpense } from '@/app/actions/expenses'
import type { Expense } from '@/app/lib/expenses'

export default function ExpenseActions({ expense }: { expense: Expense }) {
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  async function handleDelete() {
    if (!window.confirm(`Delete "${expense.description}"? This can't be undone.`)) return

    setDeleteError('')
    setDeleting(true)
    const result = await deleteExpense(expense.id)
    setDeleting(false)

    if (result?.error) setDeleteError(result.error)
  }

  return (
    <>
      <div className="flex justify-center gap-3">
        <ActionButton color="blue" onClick={() => setEditing(true)}>
          Edit
        </ActionButton>
        <ActionButton color="red" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete'}
        </ActionButton>
      </div>

      {deleteError && (
        <p className="mt-2 text-center text-lg font-bold text-[#FF1717]" role="alert">
          {deleteError}
        </p>
      )}

      {editing && <EditExpenseModal expense={expense} onClose={() => setEditing(false)} />}
    </>
  )
}

function EditExpenseModal({ expense, onClose }: { expense: Expense; onClose: () => void }) {
  const [amount, setAmount] = useState(String(expense.amount))
  const [description, setDescription] = useState(expense.description)
  const [category, setCategory] = useState<Category>(expense.category)
  const [date, setDate] = useState(expense.date)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const parsedAmount = Number(amount)
    if (!description.trim()) return setError('Description is required.')
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return setError('Enter an amount greater than $0.')
    }
    if (!date) return setError('Date is required.')

    setPending(true)
    const result = await updateExpense(expense.id, { amount: parsedAmount, description, category, date })
    setPending(false)

    if (result?.error) {
      setError(result.error)
      return
    }

    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D2A32]/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Edit expense"
    >
      <div className="tracker-card w-full max-w-md bg-[#FFF8E8] p-6">
        <h3 className="text-3xl font-bold uppercase leading-none text-[#168C2D]">Edit Expense</h3>

        <form onSubmit={handleSubmit} noValidate className="mt-5 grid gap-4">
          <Field label="Amount" id="edit-amount">
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-[#2D2A32]">$</span>
              <input
                id="edit-amount"
                type="number"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="tracker-input pl-11!"
              />
            </div>
          </Field>

          <Field label="Description" id="edit-description">
            <input
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="tracker-input"
            />
          </Field>

          <Field label="Category" id="edit-category">
            <select
              id="edit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="tracker-input"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Date" id="edit-date">
            <input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="tracker-input"
            />
          </Field>

          {error && (
            <p className="text-lg font-bold text-[#FF1717]" role="alert">
              {error}
            </p>
          )}

          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border-[3px] border-[#2D2A32] bg-white px-5 py-2 text-xl font-bold uppercase text-[#2D2A32] shadow-[3px_3px_0_#2D2A32] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#2D2A32]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="border-[3px] border-[#2D2A32] bg-[#5BAE4A] px-5 py-2 text-xl font-bold uppercase text-white shadow-[3px_3px_0_#2D2A32] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#2D2A32] disabled:pointer-events-none disabled:opacity-60"
            >
              {pending ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xl font-bold uppercase leading-none text-[#2D2A32]">
        {label}
      </label>
      {children}
    </div>
  )
}

function ActionButton({
  children,
  color,
  onClick,
  disabled,
}: {
  children: React.ReactNode
  color: 'blue' | 'red'
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`border-[3px] border-[#2D2A32] px-4 py-1 text-xl font-bold uppercase text-white shadow-[3px_3px_0_#2D2A32] transition-[transform,box-shadow] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#2D2A32] disabled:pointer-events-none disabled:opacity-60 ${
        color === 'blue' ? 'bg-[#5D9CEC]' : 'bg-[#E76F51]'
      }`}
    >
      {children}
    </button>
  )
}
