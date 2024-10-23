<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\JobListing;
use Illuminate\Http\Request;
use App\Http\Resources\JobListingResource;
use Carbon\Carbon;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function jobBoards(): Response
    {
        $jobs = JobListingResource::collection(JobListing::all());

        return Inertia::render('Admin/JobBoards', [
            'all_jobs' => $jobs,
        ]);
    }

    public function viewJobListing(JobListing $jobListing): Response
    {
        return Inertia::render('Admin/ViewJob', [
            'job' => JobListingResource::make($jobListing)->toArray(request()),
            'status' => session('status'),
            'type' => session('type')
        ]);
    }

    public function approveJobListing(JobListing $jobListing)
    {
        $jobListing->update([
            'status' => 'live',
            'expires_at' => Carbon::now()->addDays(30)
        ]);

        return redirect()->route('admin.view.job', ['jobListing' => $jobListing])
            ->with('status', 'Job Listing is now Live.')
            ->with('type', 'bg-green-500');
    }

    public function declineJobListing(Request $request, JobListing $jobListing)
    {
        $request->validate([
            'reasonForDecline' => 'required|string',
        ]);

        $jobListing->update([
            'status' => 'rejected',
            'notes' => ['rejection_note' => $request->reasonForDecline]
        ]);

        $jobListing->owner->increment('token');

        return redirect()->route('admin.view.job', ['jobListing' => $jobListing])
            ->with('status', 'Job Listing has been Declined.')
            ->with('type', 'bg-red-500');
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
