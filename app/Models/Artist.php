<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Artist extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'profil_photo',
        'cover_photo',
        'real_name',
        'birthdate',
        'birthplace',
        'biography',
        'description',
        'keywords',
        'email',
        'phone',
    ];

    protected $casts = [
        'birthdate' => 'date',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($artist) {
            if (empty($artist->slug)) {
                $artist->slug = Str::slug($artist->name);

                // Vérifier l'unicité du slug
                $originalSlug = $artist->slug;
                $count = 1;
                while (static::where('slug', $artist->slug)->exists()) {
                    $artist->slug = $originalSlug . '-' . $count;
                    $count++;
                }
            }
        });

        static::updating(function ($artist) {
            if ($artist->isDirty('name') && empty($artist->slug)) {
                $artist->slug = Str::slug($artist->name);

                // Vérifier l'unicité du slug
                $originalSlug = $artist->slug;
                $count = 1;
                while (static::where('slug', $artist->slug)->where('id', '!=', $artist->id)->exists()) {
                    $artist->slug = $originalSlug . '-' . $count;
                    $count++;
                }
            }
        });
    }
}
