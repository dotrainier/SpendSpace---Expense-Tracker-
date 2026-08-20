<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\Workspace;
use Illuminate\Validation\Rule;


class StoreExpenseRequest extends FormRequest
{
   
    public function authorize(): bool
    {
        return Workspace::where('id', $this->input('workspace_id'))
            ->where('user_id', $this->user()->id)
            ->exists();
    }

   
    public function rules(): array
    {
        return [
            'workspace_id' => ['required', 'integer'],
            'description' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0'],
            'category' => ['required', 'string', Rule::in(['Food', 'Transport', 'Utilities', 'Other'])],
            'date' => ['required', 'date'],
        ];
    }
}
