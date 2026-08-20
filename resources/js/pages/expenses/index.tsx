import { useForm, router } from '@inertiajs/react';
import type { FormEvent } from 'react';

interface Workspace {
  id: number;
  name: string;
}

interface Expense {
  id: number;
  description: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  workspaces: Workspace[];
  activeWorkspaceId: number;
  expenses: Expense[];
}

export default function ExpensesIndex({ workspaces, activeWorkspaceId, expenses }: Props) {
  const { data, setData, post, put, reset, processing, errors } = useForm({
    id: null as number | null,
    workspace_id: activeWorkspaceId,
    description: '',
    amount: '',
    category: 'Food',
    date: '',
  });

  function switchWorkspace(id: number) {
    router.get('/expenses', { workspace_id: id });
  }

  function submit(e: FormEvent) {
    e.preventDefault();

    if (data.id) {
      put(`/expenses/${data.id}`, { onSuccess: () => reset() });
    } else {
      post('/expenses', { onSuccess: () => reset() });
    }
  }

  function edit(expense: Expense) {
    console.log('expense.date:', expense.date);
    setData({
      id: expense.id,
      workspace_id: activeWorkspaceId,
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  }

  function destroy(id: number) {
    if (confirm('Delete this expense?')) {
      router.delete(`/expenses/${id}`);
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.145_0_0)] text-[oklch(0.92_0_0)]">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.55_0_0)] mb-1">Ledger</p>
          <h1 className="text-2xl font-medium" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            Expenses
          </h1>
        </div>

        <div className="flex gap-6 mb-8 border-b border-[oklch(1_0_0_/_10%)]">
          {workspaces.map((w) => {
            const active = w.id === activeWorkspaceId;

            return (
              <button
                key={w.id}
                onClick={() => switchWorkspace(w.id)}
                className={`relative pb-3 text-sm transition-colors ${
                  active
                    ? 'text-[oklch(0.92_0_0)]'
                    : 'text-[oklch(0.55_0_0)] hover:text-[oklch(0.78_0_0)]'
                }`}
              >
                {w.name}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-px h-px bg-[oklch(0.78_0.14_80)]" />
                )}
              </button>
            );
          })}
        </div>

        <form
          onSubmit={submit}
          className="mb-10 rounded-lg border border-[oklch(1_0_0_/_10%)] bg-[oklch(0.19_0_0)] p-4"
        >
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 sm:col-span-5">
              <input
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                placeholder="Description"
                className="w-full rounded-md border border-[oklch(1_0_0_/_12%)] bg-[oklch(0.145_0_0)] px-3 py-2 text-sm placeholder:text-[oklch(0.45_0_0)] outline-none focus:border-[oklch(0.78_0.14_80)] focus:ring-1 focus:ring-[oklch(0.78_0.14_80_/_40%)] transition-colors"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-[oklch(0.7_0.19_25)]">{errors.description}</p>
              )}
            </div>

            <div className="col-span-6 sm:col-span-2">
              <input
                value={data.amount}
                onChange={(e) => setData('amount', e.target.value)}
                placeholder="0.00"
                type="number"
                step="0.01"
                className="w-full rounded-md border border-[oklch(1_0_0_/_12%)] bg-[oklch(0.145_0_0)] px-3 py-2 text-sm text-right tabular-nums placeholder:text-[oklch(0.45_0_0)] outline-none focus:border-[oklch(0.78_0.14_80)] focus:ring-1 focus:ring-[oklch(0.78_0.14_80_/_40%)] transition-colors"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <select
                value={data.category}
                onChange={(e) => setData('category', e.target.value)}
                className="w-full rounded-md border border-[oklch(1_0_0_/_12%)] bg-[oklch(0.145_0_0)] px-3 py-2 text-sm outline-none focus:border-[oklch(0.78_0.14_80)] focus:ring-1 focus:ring-[oklch(0.78_0.14_80_/_40%)] transition-colors"
              >
                <option>Food</option>
                <option>Transport</option>
                <option>Utilities</option>
                <option>Other</option>
              </select>
            </div>

            <div className="col-span-8 sm:col-span-2">
              <input
                value={data.date}
                onChange={(e) => setData('date', e.target.value)}
                type="date"
                className="w-full rounded-md border border-[oklch(1_0_0_/_12%)] bg-[oklch(0.145_0_0)] px-3 py-2 text-sm outline-none focus:border-[oklch(0.78_0.14_80)] focus:ring-1 focus:ring-[oklch(0.78_0.14_80_/_40%)] transition-colors [color-scheme:dark]"
              />
            </div>

            <div className="col-span-4 sm:col-span-1">
              <button
                type="submit"
                disabled={processing}
                className="w-full h-full rounded-md bg-[oklch(0.78_0.14_80)] text-[oklch(0.145_0_0)] text-sm font-medium py-2 hover:bg-[oklch(0.82_0.14_80)] disabled:opacity-50 transition-colors"
              >
                {data.id ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </form>

  
        <div className="rounded-lg border border-[oklch(1_0_0_/_10%)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[oklch(1_0_0_/_10%)] text-xs uppercase tracking-wide text-[oklch(0.5_0_0)]">
                <th className="text-left font-normal py-3 px-4">Description</th>
                <th className="text-left font-normal py-3 px-4">Amount</th>
                <th className="text-left font-normal py-3 px-4">Category</th>
                <th className="text-left font-normal py-3 px-4">Date</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {expenses.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-[oklch(0.55_0_0)]">No expenses yet.</td>
                </tr>
              )}
              {expenses.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-[oklch(1_0_0_/_6%)] last:border-0 hover:bg-[oklch(1_0_0_/_3%)] transition-colors group"
                >
                  <td className="py-3 px-4">{e.description}</td>
                  <td
                    className="py-3 px-4 tabular-nums"
                    style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
                  >
                    {e.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center rounded-full border border-[oklch(1_0_0_/_14%)] px-2 py-0.5 text-xs text-[oklch(0.65_0_0)]">
                      {e.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[oklch(0.6_0_0)]">{e.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => edit(e)}
                        className="text-xs text-[oklch(0.6_0_0)] hover:text-[oklch(0.78_0.14_80)]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => destroy(e.id)}
                        className="text-xs text-[oklch(0.6_0_0)] hover:text-[oklch(0.7_0.19_25)]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}