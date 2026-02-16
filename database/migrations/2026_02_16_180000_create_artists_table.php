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
        Schema::create('artists', function (Blueprint $table) {
            $table->id();

            // Informations de base
            $table->string('name')->unique(); // Nom de scène
            $table->string('slug')->unique(); // Généré automatiquement

            // Photos
            $table->string('profil_photo')->nullable();
            $table->string('cover_photo')->nullable();

            // Informations personnelles
            $table->string('real_name')->nullable();
            $table->date('birthdate')->nullable();
            $table->string('birthplace')->nullable();

            // Contenu
            $table->text('biography')->nullable(); // Long texte
            $table->text('description')->nullable(); // Résumé court (SEO/Aperçu)
            $table->string('keywords')->nullable(); // Ex: "Rap, Trap, Gasy"

            // Contact
            $table->string('email')->nullable();
            $table->string('phone')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('artists');
    }
};
