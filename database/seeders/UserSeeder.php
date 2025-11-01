<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        $users = [
            [
                'name' => 'King Zhukur',
                'email' => 'kingzhukur@gmail.com',
                'password' => Hash::make('Bigtable123'),
                'role' => 'admin',
            ],
            [
                'name' => 'Amin',
                'email' => 'amin@gmail.com',
                'password' => Hash::make('Bigtable123'),
                'role' => 'admin',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}