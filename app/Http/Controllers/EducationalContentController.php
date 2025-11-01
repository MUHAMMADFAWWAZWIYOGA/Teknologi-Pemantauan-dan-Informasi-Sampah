<?php

namespace App\Http\Controllers;

use App\Models\EducationalContent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class EducationalContentController extends Controller
{
    public function index()
    {
        $contents = EducationalContent::with('creator')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('konten', [
            'contents' => $contents->map(function ($content) {
                return [
                    'id' => $content->id,
                    'title' => $content->title,
                    'type' => $content->type,
                    // guard image path in case it's missing
                    'imageUrl' => $content->image_path ? Storage::url($content->image_path) : null,
                    'description' => $content->description,
                    'active' => $content->is_active,
                    'createdAt' => $content->created_at ? $content->created_at->format('Y-m-d') : null,
                    // use optional() to avoid exception when creator relation is missing
                    'createdBy' => optional($content->creator)->name,
                ];
            })
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:infografis,poster',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string'
        ]);

        $imagePath = $request->file('image')->store('educational-contents', 'public');

        EducationalContent::create([
            'title' => $request->title,
            'type' => $request->type,
            'image_path' => $imagePath,
            'description' => $request->description,
            'is_active' => true,
            // prefer $request->user() to make the dependency explicit and satisfy static analysis
            'created_by' => $request->user() ? $request->user()->id : null,
        ]);

        return redirect()->back()->with('message', 'Konten berhasil ditambahkan');
    }

    public function update(Request $request, EducationalContent $content)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|in:infografis,poster',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'required|string',
            'is_active' => 'required|boolean'
        ]);

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($content->image_path) {
                Storage::disk('public')->delete($content->image_path);
            }
            $data['image_path'] = $request->file('image')->store('educational-contents', 'public');
        }

        $content->update($data);

        return redirect()->back()->with('message', 'Konten berhasil diperbarui');
    }

    public function destroy(EducationalContent $content)
    {
        if ($content->image_path) {
            Storage::disk('public')->delete($content->image_path);
        }
        
        $content->delete();

        return redirect()->back()->with('message', 'Konten berhasil dihapus');
    }

    public function toggleActive(EducationalContent $content)
    {
        $content->update([
            'is_active' => !$content->is_active
        ]);

        return redirect()->back()->with('message', 'Status konten berhasil diubah');
    }
}