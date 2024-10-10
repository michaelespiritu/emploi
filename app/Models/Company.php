<?php

namespace App\Models;

use App\Models\JobListing;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Company extends Model
{
    use HasFactory, HasUlids;


    protected $fillable = [
        'company_name',
        'company_address',
        'company_logo',
        'owner_id',
        'token'
    ];


    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function jobListings(): HasMany
    {
        return $this->HasMany(JobListing::class);
    }

    public function employees(): HasMany
    {
        return $this->HasMany(User::class);
    }
}
