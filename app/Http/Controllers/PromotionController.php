<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $promotions = Promotion::with(['manager', 'artist'])
            ->latest()
            ->paginate(15);

        return Inertia::render('promotions/index', [
            'promotions' => $promotions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = \App\Models\User::select('id', 'name')->get();
        $artists = \App\Models\Artist::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('promotions/create', [
            'users' => $users,
            'artists' => $artists,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'artist_id' => 'required|exists:artists,id',
            'track_title' => 'required|string|max:255',
            'intermediary_name' => 'nullable|string|max:255',
            'intermediary_contact' => 'required|string|max:255',
            'intermediary_channel' => 'required|string|max:255',
            'package_tier' => 'required|string|max:255',
            'boost_count' => 'nullable|integer|min:0',
            'amount_paid' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'receiver_number' => 'required|string|max:255',
            'transaction_id' => 'nullable|string|max:255|unique:promotions,transaction_id',
            'manager_id' => 'required|exists:users,id',
            'status' => 'required|in:PENDING,ACTIVE,DONE',
        ]);
        Promotion::create($validated);

        return redirect()->route('promotions.index')
            ->with('success', 'Promotion créée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Promotion $promotion)
    {
        $promotion->load(['artist', 'manager']);

        return Inertia::render('promotions/show', [
            'promotion' => $promotion,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Promotion $promotion)
    {
        $users = \App\Models\User::select('id', 'name')->get();
        $artists = \App\Models\Artist::select('id', 'name')->orderBy('name')->get();

        return Inertia::render('promotions/edit', [
            'promotion' => $promotion,
            'users' => $users,
            'artists' => $artists,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Promotion $promotion)
    {
        $validated = $request->validate([
            'artist_id' => 'required|exists:artists,id',
            'track_title' => 'required|string|max:255',
            'intermediary_name' => 'nullable|string|max:255',
            'intermediary_contact' => 'required|string|max:255',
            'intermediary_channel' => 'required|string|max:255',
            'package_tier' => 'required|string|max:255',
            'boost_count' => 'nullable|integer|min:0',
            'amount_paid' => 'required|numeric|min:0',
            'payment_method' => 'required|string|max:255',
            'receiver_number' => 'required|string|max:255',
            'transaction_id' => 'nullable|string|max:255|unique:promotions,transaction_id,' . $promotion->id,
            'manager_id' => 'required|exists:users,id',
            'status' => 'required|in:PENDING,ACTIVE,DONE',
        ]);

        $promotion->update($validated);

        return redirect()->route('promotions.show', $promotion)
            ->with('success', 'Promotion mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Promotion $promotion)
    {
        $promotion->delete();

        return redirect()->route('promotions.index')
            ->with('success', 'Promotion supprimée avec succès.');
    }
}
