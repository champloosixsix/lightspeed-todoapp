<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('projects')->insert([
            ['id' => 1, 'name' => 'E-Commerce Website'],
            ['id' => 2, 'name' => 'Websocket Updates'],
            ['id' => 3, 'name' => 'Angular Upgrade'],
        ]);
    }
}
