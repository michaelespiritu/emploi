<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'company' => [
                'name' => $this->owner->company_name,
                'address' => $this->owner->company_address,
                'id' => $this->owner->id,
            ],
            'category' => [
                'name' => $this->category->name,
                'slug' => $this->category->slug
            ],
            'category_id' => $this->category->id,
            'title' => $this->title,
            'description' => $this->description,
            'short_description' => $this->short_description,
            'location' => $this->location,
            'budget' => $this->budget,
            'hours_per_week' => $this->hours_per_week,
            'type' => $this->type,
            'contract_type' => $this->contract_type,
            'contract_length' => $this->contract_length,
            'status' => $this->status,
            'expires_at' => $this->expires_at->format('F d, Y h:i:sA'),
            'created_at' => $this->created_at->format('F d, Y h:i:sA'),
            'created_at_human' => $this->created_at->diffForHumans()
        ];
    }
}
