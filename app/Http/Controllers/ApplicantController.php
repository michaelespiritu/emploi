<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Http\UploadedFile;
use App\Http\Requests\ApplyRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class ApplicantController extends Controller
{
    public function apply(ApplyRequest $request)
    {
        // First, try to register the applicant
        try {
            $this->registerApplicant($request);
        } catch (\Exception $e) {
            // If registration fails, return the error response
            return back()->with('status', 'Applicant registration failed. Please try again later.')
                ->with('type', 'bg-red-500');
        }

        // If the registration is successful, proceed to handle the resume upload
        $uploadResponse = $this->handleResumeUpload($request->file('resume'));

        return $uploadResponse;
    }

    private function registerApplicant(ApplyRequest $request): void
    {
        // Validate the incoming request data for the applicant
        $request->validate([
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'username' => 'required|string|email|max:255|unique:' . User::class,
        ]);

        try {
            $password = Str::password(12); // Generate a random password
            $hashedPassword = Hash::make($password); // Hash the password
            // Create the new applicant user
            $user = User::create([
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'username' => Str::lower($request->first_name . $request->last_name),
                'password' => $hashedPassword,
            ]);
            Log::info("$request->email password is $password");

            $user->assignRole('applicant');
        } catch (\Exception $e) {
            Log::error('Error registering applicant: ' . $e->getMessage());
            throw new \Exception('Applicant registration failed. Please try again later.');
        }
    }

    private function handleResumeUpload(?UploadedFile $resume)
    {
        // If no file is uploaded, return an error response
        if (!$resume) {
            return back()->with('status', 'No file was uploaded.');
        }

        try {
            // Generate a unique file name for the uploaded resume
            $fileName = $this->generateUniqueFileName($resume);

            // Store the file and return the path
            $path = $this->storeFile($resume, $fileName);

            // Return a success response with the file path
            return redirect()->back()
                ->with('status', 'File uploaded successfully.')
                ->with('type', 'bg-green-500')
                ->with('path', $path);
        } catch (\Exception $e) {
            Log::error('File upload failed: ' . $e->getMessage());
            return redirect()->back()
                ->with('status', 'File upload failed. Please try again.')
                ->with('type', 'bg-red-500');
        }
    }

    private function generateUniqueFileName(UploadedFile $file): string
    {
        // Generate a unique file name based on the original file extension
        $originalExtension = $file->getClientOriginalExtension();
        return uniqid('file_', true) . '.' . $originalExtension;
    }

    private function storeFile(UploadedFile $file, string $fileName): string
    {
        // Store the file in the 'uploads' directory with the 'public' disk
        return $file->storeAs('uploads', $fileName, 'public');
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
