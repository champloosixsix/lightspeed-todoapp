<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tasks')->insert([
            ['id' => 1, 'project_id' => 1, 'assigned_user_id' => 3, 'title' => 'Product Pages', 'estimated_hours' => 5],
            ['id' => 2, 'project_id' => 1, 'assigned_user_id' => 2, 'title' => 'Shopping Cart', 'estimated_hours' => 10],
            ['id' => 3, 'project_id' => 1, 'assigned_user_id' => 3, 'title' => 'My Account', 'estimated_hours' => 5],
            ['id' => 4, 'project_id' => 2, 'assigned_user_id' => 1, 'title' => 'Add to Socket IO', 'estimated_hours' => 2],
            ['id' => 5, 'project_id' => 2, 'assigned_user_id' => 1, 'title' => 'Enable Broadcasting', 'estimated_hours' => 5],
            ['id' => 6, 'project_id' => 2, 'assigned_user_id' => 1, 'title' => 'Adjust Interface', 'estimated_hours' => 3],
            ['id' => 7, 'project_id' => 3, 'assigned_user_id' => 4, 'title' => 'Upgrade Angular', 'estimated_hours' => 15],
            ['id' => 8, 'project_id' => 3, 'assigned_user_id' => 1, 'title' => 'Fix Broken Things', 'estimated_hours' => 10],
            ['id' => 9, 'project_id' => 3, 'assigned_user_id' => 4, 'title' => 'Test', 'estimated_hours' => 10],
        ]);
    }
}
