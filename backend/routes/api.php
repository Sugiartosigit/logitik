<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupplierOrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::get('/profile', [ProfileController::class, 'show']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware(['auth:sanctum'])->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'profile']);
    
    // Supplier Orders routes
    Route::apiResource('supplier-orders', SupplierOrderController::class);
    Route::post('/supplier-orders/import', [SupplierOrderController::class, 'import'])
         ->middleware('role:admin,manager'); // Only admin and manager can import
    
    // Additional supplier order routes with role restrictions
    Route::middleware('role:admin,manager')->group(function () {
        Route::delete('/supplier-orders/{supplierOrder}', [SupplierOrderController::class, 'destroy']);
    });
});

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'OK',
        'timestamp' => now(),
        'version' => '1.0.0'
    ]);
});