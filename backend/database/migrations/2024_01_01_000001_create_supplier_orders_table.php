<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('supplier_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->comment('Nomor order unik');
            $table->string('supplier_name', 200)->comment('Nama supplier');
            $table->string('supplier_contact', 100)->nullable()->comment('Kontak supplier (phone/email)');
            $table->date('order_date')->comment('Tanggal order');
            $table->date('delivery_date')->nullable()->comment('Tanggal pengiriman');
            $table->decimal('total_amount', 15, 2)->default(0)->comment('Total amount order');
            $table->enum('status', ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
                  ->default('pending')
                  ->comment('Status order');
            $table->json('items')->nullable()->comment('Detail items dalam order (JSON)');
            $table->text('notes')->nullable()->comment('Catatan tambahan');
            $table->foreignId('created_by')->constrained('users')->comment('User yang membuat order');
            $table->foreignId('updated_by')->nullable()->constrained('users')->comment('User yang terakhir update');
            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index(['supplier_name', 'status']);
            $table->index(['order_date', 'delivery_date']);
            $table->index(['created_by', 'updated_by']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_orders');
    }
};