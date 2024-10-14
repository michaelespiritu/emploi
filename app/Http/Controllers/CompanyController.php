<?php

namespace App\Http\Controllers;

use App\Models\JobListing;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Auth\MustVerifyEmail;

class CompanyController extends Controller
{
    /**
     * Display the company details.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }


    public function getBuyToken(Request $request): Response
    {
        return Inertia::render('Company/BuyCredit', [
            'status' => "Tokens are used to create Job Listing.",
        ]);
    }


    public function postBuyToken(Request $request)
    {
        $currentToken = auth()->user()->userCompany->token;

        auth()->user()->userCompany->update(['token' => $currentToken + $request->token]);

        if ($request->job) {
            JobListing::find($request->job)->update(['status' => 'reviewing']);

            return redirect()->route('job.show', ['jobListing' => $request->job])
                ->with('status', 'Job has been submitted for Review.');
        }

        return redirect()->route('job.index');
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
