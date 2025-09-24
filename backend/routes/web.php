<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Logitik ERP Backend API',
        'version' => '1.0.0',
        'documentation' => '/api/documentation',
        'health' => '/api/health'
    ]);
});