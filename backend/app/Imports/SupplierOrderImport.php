<?php

namespace App\Imports;

use App\Models\SupplierOrder;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\Importable;
use Carbon\Carbon;

class SupplierOrderImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    protected $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        // Skip if order_number already exists
        if (SupplierOrder::where('order_number', $row['order_number'])->exists()) {
            return null;
        }

        return new SupplierOrder([
            'order_number' => $row['order_number'],
            'supplier_name' => $row['supplier_name'],
            'supplier_contact' => $row['supplier_contact'] ?? null,
            'order_date' => $this->transformDate($row['order_date']),
            'delivery_date' => $this->transformDate($row['delivery_date'] ?? null),
            'total_amount' => $row['total_amount'] ?? 0,
            'status' => $row['status'] ?? 'pending',
            'items' => $this->transformItems($row['items'] ?? null),
            'notes' => $row['notes'] ?? null,
            'created_by' => $this->userId,
            'updated_by' => $this->userId,
        ]);
    }

    /**
     * Transform date value from Excel
     */
    private function transformDate($value)
    {
        if (empty($value)) {
            return null;
        }

        try {
            // Handle Excel serial date numbers
            if (is_numeric($value)) {
                return Carbon::createFromFormat('Y-m-d', gmdate('Y-m-d', ($value - 25569) * 86400));
            }
            
            // Handle string dates
            return Carbon::parse($value)->format('Y-m-d');
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Transform items JSON string to array
     */
    private function transformItems($value)
    {
        if (empty($value)) {
            return null;
        }

        try {
            if (is_string($value)) {
                return json_decode($value, true);
            }
        } catch (\Exception $e) {
            return null;
        }

        return $value;
    }

    /**
     * Validation rules for import
     */
    public function rules(): array
    {
        return [
            'order_number' => 'required|string',
            'supplier_name' => 'required|string|max:200',
            'supplier_contact' => 'nullable|string|max:100',
            'order_date' => 'required',
            'delivery_date' => 'nullable',
            'total_amount' => 'nullable|numeric|min:0',
            'status' => 'nullable|in:pending,confirmed,shipped,delivered,cancelled',
        ];
    }

    /**
     * Custom validation messages
     */
    public function customValidationMessages()
    {
        return [
            'order_number.required' => 'Nomor order wajib diisi',
            'supplier_name.required' => 'Nama supplier wajib diisi',
            'order_date.required' => 'Tanggal order wajib diisi',
            'total_amount.numeric' => 'Total amount harus berupa angka',
            'status.in' => 'Status tidak valid',
        ];
    }
}