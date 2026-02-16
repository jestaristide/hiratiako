<?php

namespace App\Models;

use App\Models\Artist; // Added this line
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Promotion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'artist_id', // Changed from 'artist_name'
        'track_title',
        'intermediary_name',
        'intermediary_contact',
        'intermediary_channel',
        'package_tier',
        'boost_count',
        'amount_paid',
        'payment_method',
        'receiver_number',
        'transaction_id',
        'manager_id',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'amount_paid' => 'decimal:2',
        'boost_count' => 'integer',
    ];

    /**
     * Get the artist associated with the promotion.
     */
    public function artist(): BelongsTo
    {
        return $this->belongsTo(Artist::class);
    }

    /**
     * Get the manager (user) who manages this promotion.
     */
    public function manager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
