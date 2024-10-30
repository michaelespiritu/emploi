<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ApplyRequest;
use Illuminate\Support\Facades\Storage;

class ApplicantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function apply(ApplyRequest $request)
    {
        // Store the file with a custom name
        if ($request->file('resume')) {
            $originalExtension = $request->file('resume')->getClientOriginalExtension();
            $randomFileName = uniqid('file_', true) . '.' . $originalExtension; // Generate a unique filename

            // Store the file
            $path = $request->file('resume')->storeAs('uploads', $randomFileName, 'public'); // Store in 'storage/app/public/uploads'

            // Optionally, return the path or do something with it
            return back()->with('success', 'File uploaded successfully.')->with('path', $path);
        }

        return back()->with('error', 'File upload failed.');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
