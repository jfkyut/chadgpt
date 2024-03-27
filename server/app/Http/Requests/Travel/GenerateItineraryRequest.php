<?php

namespace App\Http\Requests\Travel;

use Illuminate\Foundation\Http\FormRequest;

class GenerateItineraryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            'arrival' => 'date|required',
            'departure' => 'date|required',
            'places' => 'array|required',
            'accommodations' => 'array|required',
            'activities' => 'array|required',
            'individual_count' => 'integer|required'
        ];
    }
}
