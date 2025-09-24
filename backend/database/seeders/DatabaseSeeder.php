<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\SupplierOrder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'email' => 'admin@logitik.com',
            'nik' => 'ADMIN001',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        // Create manager user
        $manager = User::create([
            'email' => 'manager@logitik.com',
            'nik' => 'MGR001',
            'password' => Hash::make('password123'),
            'role' => 'manager',
        ]);

        // Create staff user
        $staff = User::create([
            'email' => 'staff@logitik.com',
            'nik' => 'STF001', 
            'password' => Hash::make('password123'),
            'role' => 'staff',
        ]);

        // Create sample supplier orders
        SupplierOrder::create([
            'order_number' => 'SO-2025-001',
            'supplier_name' => 'PT Supplier Indonesia',
            'supplier_contact' => 'supplier@example.com',
            'order_date' => '2025-01-15',
            'delivery_date' => '2025-01-25',
            'total_amount' => 15000000.00,
            'status' => 'confirmed',
            'items' => [
                [
                    'name' => 'Barang A',
                    'quantity' => 100,
                    'unit_price' => 50000,
                    'total' => 5000000
                ],
                [
                    'name' => 'Barang B', 
                    'quantity' => 200,
                    'unit_price' => 50000,
                    'total' => 10000000
                ]
            ],
            'notes' => 'Order pertama untuk testing',
            'created_by' => $admin->id,
            'updated_by' => $admin->id,
        ]);

        SupplierOrder::create([
            'order_number' => 'SO-2025-002',
            'supplier_name' => 'CV Mitra Logistik',
            'supplier_contact' => '+62812345678',
            'order_date' => '2025-01-16',
            'delivery_date' => '2025-01-30',
            'total_amount' => 8500000.00,
            'status' => 'pending',
            'items' => [
                [
                    'name' => 'Barang C',
                    'quantity' => 50,
                    'unit_price' => 170000,
                    'total' => 8500000
                ]
            ],
            'notes' => 'Urgent order - prioritas tinggi',
            'created_by' => $manager->id,
            'updated_by' => $manager->id,
        ]);
    }
}