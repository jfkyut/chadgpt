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
        Schema::create('travel_itineraries', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->longText('plan');
            $table->foreignUuid('user_id')
                    ->constrained('users')
                    ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travel_itineraries');
    }
};
