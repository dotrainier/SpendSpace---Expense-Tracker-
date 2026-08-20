<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Expense;

class ExpensePolicy
{
     public function update(User $user, Expense $expense): bool
    {
        return $expense->workspace->user_id === $user->id;
    }

    public function delete(User $user, Expense $expense): bool
    {
        return $expense->workspace->user_id === $user->id;
    }
}
