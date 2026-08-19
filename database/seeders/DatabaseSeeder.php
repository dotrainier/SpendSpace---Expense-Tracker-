<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Expense;
use App\Models\Workspace;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       
        $alice = User::factory()->create([
        'name' => 'Alice',
        'email' => 'alice@demo.test',
        'password' => bcrypt('password'),
        ]);

        $bob = User::factory()->create([
        'name' => 'Bob',
        'email' => 'bob@demo.test',
        'password' => bcrypt('password'),
        ]);

        $household = Workspace::create(['user_id' => $alice->id, 'name' => 'Household']);
        $freelance = Workspace::create(['user_id' => $alice->id, 'name' => 'Freelance Work']);
        $bobWorkspace = Workspace::create(['user_id' => $bob->id, 'name' => "Bob's Budget"]);

        Expense::factory()->count(4)->create(['workspace_id' => $household->id]);
        Expense::factory()->count(3)->create(['workspace_id' => $freelance->id]);
        Expense::factory()->count(3)->create(['workspace_id' => $bobWorkspace->id]);
    }
}
