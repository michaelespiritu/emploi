<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\JobListing;
use Illuminate\Http\Request;
use App\Models\JobCategories;
use App\Http\Resources\JobListingResource;
use App\Http\Resources\JobCategoryResource;

class JobListingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Company/Jobs/Index', [
            'status' => session('status'),
            'categories' => JobCategoryResource::collection(JobCategories::all()),
            'all_jobs' => auth()->check() && auth()->user()->userCompany ? JobListingResource::collection(auth()->user()->userCompany->jobListings)->toArray(request()) : [],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request['status'] = 'reviewing';
        $request['expires_at'] = Carbon::now()->addDays(30);
        $job = auth()->user()->userCompany->jobListings()->create($request->all());

        return redirect()->route('job.show', ['jobListing' => $job])->with('status', 'Job has been Created');
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
    public function show(JobListing $jobListing)
    {
        // return JobListingResource::make($jobListing);
        return Inertia::render('Company/Jobs/Show', [
            'job' => JobListingResource::make($jobListing)->toArray(request()),
            'status' => session('status'),
        ]);
    }

    /**
     * Fetch All Category.
     */
    public function categories()
    {
        return JobCategories::all();
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
