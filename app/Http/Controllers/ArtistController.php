<?php

namespace App\Http\Controllers;

use App\Models\Artist;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $artists = Artist::latest()
            ->paginate(15);

        return Inertia::render('artists/index', [
            'artists' => $artists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('artists/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:artists,name',
            'slug' => 'nullable|string|max:255|unique:artists,slug',
            'profil_photo' => 'nullable|string|max:255',
            'cover_photo' => 'nullable|string|max:255',
            'real_name' => 'nullable|string|max:255',
            'birthdate' => 'nullable|date',
            'birthplace' => 'nullable|string|max:255',
            'biography' => 'nullable|string',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
        ]);

        Artist::create($validated);

        return redirect()->route('artists.index')
            ->with('success', 'Artiste créé avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Artist $artist)
    {
        return Inertia::render('artists/show', [
            'artist' => $artist,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Artist $artist)
    {
        return Inertia::render('artists/edit', [
            'artist' => $artist,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Artist $artist)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:artists,name,' . $artist->id,
            'slug' => 'nullable|string|max:255|unique:artists,slug,' . $artist->id,
            'profil_photo' => 'nullable|string|max:255',
            'cover_photo' => 'nullable|string|max:255',
            'real_name' => 'nullable|string|max:255',
            'birthdate' => 'nullable|date',
            'birthplace' => 'nullable|string|max:255',
            'biography' => 'nullable|string',
            'description' => 'nullable|string',
            'keywords' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
        ]);

        $artist->update($validated);

        return redirect()->route('artists.index')
            ->with('success', 'Artiste mis à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Artist $artist)
    {
        $artist->delete();

        return redirect()->route('artists.index')
            ->with('success', 'Artiste supprimé avec succès.');
    }
}
