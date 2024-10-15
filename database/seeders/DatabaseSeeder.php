<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Support\Str;
use App\Models\JobCategories;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        // JobCategories::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin: Emploi',
            'username' => 'admin_emploi',
            'email' => 'admin@emploi.com',
        ]);
        // $jobCategories = collect(['Agriculture', 'Customer Service', 'Human Resources', 'Technology', 'Maintenance']);

        // foreach ($jobCategories as $jobCategory) {
        //     JobCategories::factory()->create([
        //         'name' => $jobCategory,
        //         'slug' => Str::slug($jobCategory),
        //     ]);
        // }
    }
}
