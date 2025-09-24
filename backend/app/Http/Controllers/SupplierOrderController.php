<?php

namespace App\Http\Controllers;

use App\Models\SupplierOrder;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SupplierOrderImport;

class SupplierOrderController extends Controller
{
    /**
     * Display a listing of supplier orders
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $query = SupplierOrder::with(['creator:id,email,nik', 'updater:id,email,nik']);

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->byStatus($request->status);
        }

        // Filter by date range
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->byDateRange($request->start_date, $request->end_date);
        }

        // Search by supplier name or order number
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('supplier_name', 'like', "%{$search}%")
                  ->orWhere('order_number', 'like', "%{$search}%");
            });
        }

        $orders = $query->orderBy('created_at', 'desc')
                       ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }

    /**
     * Store a newly created supplier order
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'order_number' => 'required|string|unique:supplier_orders,order_number',
            'supplier_name' => 'required|string|max:200',
            'supplier_contact' => 'nullable|string|max:100',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date|after_or_equal:order_date',
            'total_amount' => 'required|numeric|min:0',
            'status' => ['required', Rule::in(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])],
            'items' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        $order = SupplierOrder::create($validated);
        $order->load(['creator:id,email,nik', 'updater:id,email,nik']);

        return response()->json([
            'success' => true,
            'message' => 'Order supplier berhasil dibuat',
            'data' => $order
        ], 201);
    }

    /**
     * Display the specified supplier order
     *
     * @param SupplierOrder $supplierOrder
     * @return JsonResponse
     */
    public function show(SupplierOrder $supplierOrder): JsonResponse
    {
        $supplierOrder->load(['creator:id,email,nik', 'updater:id,email,nik']);

        return response()->json([
            'success' => true,
            'data' => $supplierOrder
        ]);
    }

    /**
     * Update the specified supplier order
     *
     * @param Request $request
     * @param SupplierOrder $supplierOrder
     * @return JsonResponse
     */
    public function update(Request $request, SupplierOrder $supplierOrder): JsonResponse
    {
        $validated = $request->validate([
            'order_number' => 'required|string|unique:supplier_orders,order_number,' . $supplierOrder->id,
            'supplier_name' => 'required|string|max:200',
            'supplier_contact' => 'nullable|string|max:100',
            'order_date' => 'required|date',
            'delivery_date' => 'nullable|date|after_or_equal:order_date',
            'total_amount' => 'required|numeric|min:0',
            'status' => ['required', Rule::in(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])],
            'items' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        $validated['updated_by'] = $request->user()->id;

        $supplierOrder->update($validated);
        $supplierOrder->load(['creator:id,email,nik', 'updater:id,email,nik']);

        return response()->json([
            'success' => true,
            'message' => 'Order supplier berhasil diupdate',
            'data' => $supplierOrder
        ]);
    }

    /**
     * Remove the specified supplier order
     *
     * @param SupplierOrder $supplierOrder
     * @return JsonResponse
     */
    public function destroy(SupplierOrder $supplierOrder): JsonResponse
    {
        $supplierOrder->delete();

        return response()->json([
            'success' => true,
            'message' => 'Order supplier berhasil dihapus'
        ]);
    }

    /**
     * Import supplier orders from Excel file
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function import(Request $request): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls|max:5120', // Max 5MB
        ]);

        try {
            Excel::import(new SupplierOrderImport($request->user()->id), $request->file('file'));

            return response()->json([
                'success' => true,
                'message' => 'Data supplier order berhasil diimport'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengimport data: ' . $e->getMessage()
            ], 422);
        }
    }
}