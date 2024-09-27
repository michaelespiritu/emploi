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
        Schema::create('job_listings', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignUlid('company_id')->constrained('companies')->cascadeOnDelete();
            $table->foreignUlid('category_id')->constrained('job_categories');
            $table->string('title');
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->string('location');
            $table->string('budget');
            $table->string('hours_per_week');
            $table->string('type'); //Full Time or Part Time
            $table->string('contract_type'); //Full Time or Part Time
            $table->string('contract_length')->nullable(); //Full Time or Part Time
            $table->string('status')->default('reviewing');
            $table->dateTime('expires_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};
