<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            ['id' => 1, 'name' => 'Stuart'],
            ['id' => 2, 'name' => 'Tyler'],
            ['id' => 3, 'name' => 'Adam'],
            ['id' => 4, 'name' => 'Lan'],
        ]);
    }
}
