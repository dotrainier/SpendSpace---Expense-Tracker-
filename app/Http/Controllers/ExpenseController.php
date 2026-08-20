<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;
use Inertia\Inertia;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $workspaces = $request->user()->workspaces()->get(['id', 'name']);

        $activeWorkspace = $workspaces->firstWhere('id', (int) $request->query('workspace_id'))
            ?? $workspaces->first();

        abort_if(!$activeWorkspace, 404);

        $expenses = Expense::forWorkspace($activeWorkspace->id)
            ->orderByDesc('date')
            ->get();

        return Inertia::render('expenses/index', [
            'workspaces' => $workspaces,
            'activeWorkspaceId' => $activeWorkspace->id,
            'expenses' => $expenses,
        ]);
    }

     public function store(StoreExpenseRequest $request)
    {
        Expense::create($request->validated());

        return back();
    }


    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        $this->authorize('update', $expense);

        $expense->update($request->validated());

        return back();
    }

    public function destroy(Request $request, Expense $expense)
    {
        $this->authorize('delete', $expense);

        $expense->delete();

        return back();
    }


}
