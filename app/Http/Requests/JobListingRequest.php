<?php

namespace App\Http\Requests;

use App\Models\JobListing;
use Illuminate\Foundation\Http\FormRequest;

class JobListingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        if ($this->route('jobListing')) {
            return $this->route('jobListing')->company_id === $this->user()->userCompany->id;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required'],
            'description' => ['required'],
            'category_id' => ['required'],
            'location' => ['required'],
            'budget' => ['required'],
            'hours_per_week' => ['required'],
            'type' => ['required'],
            'contract_type' => ['required'],
        ];
    }
}
