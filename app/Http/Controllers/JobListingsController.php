<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\JobListing;
use Illuminate\Http\Request;
use App\Models\JobCategories;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\JobListingRequest;
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
    public function create(JobListingRequest $request)
    {
        $userCompany = auth()->user()->userCompany;

        $job = $this->createJobListing($request, $userCompany);
        $currentToken = $userCompany->token;
        $this->handleTokenDecrement($userCompany);

        return $this->handleRedirect($job, $currentToken);
    }

    private function createJobListing(JobListingRequest $request, $userCompany)
    {
        $status = $userCompany->token > 0 ? 'reviewing' : 'draft';
        $expiresAt = Carbon::now()->addDays(30);

        return $userCompany->jobListings()->create(array_merge($request->all(), [
            'status' => $status,
            'expires_at' => $expiresAt,
        ]));
    }

    private function handleTokenDecrement($userCompany)
    {
        if ($userCompany && $userCompany->token > 0) {
            $userCompany->decrement('token');
        }
    }

    private function handleRedirect($job, $currentToken)
    {
        if ($currentToken <= 0) {
            return Inertia::render('Company/BuyCredit', [
                'status' => 'You have used all your tokens. Please purchase more to create additional job listings.',
            ]);
        }

        return redirect()->route('job.show', ['jobListing' => $job])
            ->with('status', 'Job has been created');
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
    public function edit(JobListing $jobListing)
    {
        return Inertia::render('Company/Jobs/Edit', [
            'job' => JobListingResource::make($jobListing)->toArray(request()),
            'status' => session('status'),
            'categories' => JobCategoryResource::collection(JobCategories::all())
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(JobListingRequest $request, JobListing $jobListing)
    {
        $jobListing->update($request->all());
        return redirect()->route('job.show', ['jobListing' => $jobListing])->with('status', 'Job has been Created');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
