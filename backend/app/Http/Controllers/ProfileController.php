<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * Get public profile information (dummy data)
     *
     * @return JsonResponse
     */
    public function show(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'company' => [
                    'name' => 'Hayder Logistics System',
                    'description' => 'Sistem ERP untuk manajemen logistik dan supply chain yang terintegrasi',
                    'established' => '2025',
                    'modules' => [
                        'Supplier Order Management',
                        'Driver Management', 
                        'Standard Operating Procedures (SOP)',
                        'HR Automation',
                        'Inventory Management',
                    ]
                ],
                'features' => [
                    'Multi-database support (MySQL & SQL Server)',
                    'Role-based access control',
                    'Excel import/export functionality',
                    'Real-time data synchronization',
                    'Multilingual support (Indonesian/English)',
                    'RESTful API architecture',
                ],
                'contact' => [
                    'email' => 'info@hayder-logistics.com',
                    'phone' => '+62-21-12345678',
                    'address' => 'Jakarta, Indonesia'
                ],
                'version' => '1.0.0',
                'last_updated' => now()->format('Y-m-d H:i:s')
            ]
        ]);
    }
}