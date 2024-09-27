<?php

namespace App\Models;

use App\Models\Company;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobListing extends Model
{
    use HasFactory, HasUlids;

    protected $guarded = [];

    protected $appends = ['category_name'];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(JobCategories::class);
    }

    public function getCategoryNameAttribute()
    {
        return $this->category ? $this->category->name : null;
    }

    public function getCompanyAttribute()
    {
        return $this->owner ? [
            'name' => $this->owner->name,
            'address' => $this->owner->address, // or any other property
        ] : null;
    }
}
