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


    public function getBuyToken(): Response
    {
        return Inertia::render('Company/BuyCredit', [
            'status' => "Tokens are used to create Job Listing.",
        ]);
    }


    public function postBuyToken(Request $request)
    {
        $request->validate([
            'token' => 'required|numeric|min:5'
        ]);

        $currentToken = auth()->user()->userCompany->token;
        $newToken = $currentToken + $request->token;

        $return  = $this->postBuyTokenRedirect();

        if ($request->filled('job')) {
            JobListing::find($request->job)->update(['status' => 'reviewing']);
            $newToken--;
            $return  = $this->postBuyTokenRedirect($request->job);
        }

        auth()->user()->userCompany->update(['token' => $newToken]);

        return $return;
    }


    private function postBuyTokenRedirect($job = null)
    {
        if ($job) {
            return redirect()->route('job.show', ['jobListing' => $job])
                ->with('status', 'Job has been submitted for Review.')
                ->with('type', 'bg-green-500');
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
