<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;


class ExpenseFactory extends Factory
{
    
    public function definition(): array
    {
        return [
            'description' => fake()->words(3, true),
            'amount' => fake()->randomFloat(2, 5, 500),
            'category' => fake()->randomElement(['Food', 'Transport', 'Utilities', 'Other']),
            'date' => fake()->dateTimeBetween('-2 months', 'now'),
        ];
    }
}
