<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->id();

            // Informations Artiste & Track
            $table->foreignId('artist_id')->constrained('artists')->cascadeOnDelete();
            $table->string('track_title');
            $table->string('intermediary_name')->nullable();
            $table->string('intermediary_contact');
            $table->string('intermediary_channel'); // Ex: FB, WhatsApp
            $table->string('package_tier'); // 'Premium', 'Royal', etc.
            $table->integer('boost_count')->default(0);
            $table->decimal('amount_paid', 12, 2);
            $table->string('payment_method'); // 'OrangeMoney', 'Mvola', 'Espace'
            $table->string('receiver_number');
            $table->string('transaction_id')->unique()->nullable();
            $table->foreignId('manager_id')->constrained('users');
            $table->enum('status', ['PENDING', 'ACTIVE', 'DONE'])->default('PENDING');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
