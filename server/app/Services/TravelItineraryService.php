<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class TravelItineraryService
{
    public function getTravelItineraries()
    {
        $travels = Auth::user()
                    ->travelItineraries()
                    ->latest()
                    ->get();
        
        foreach ($travels as $travel) {
            $travel['plan'] = Crypt::decrypt($travel['plan']);
        }

        return $travels;
    }

    public function initializeMessage($userChoices)
    {
        $places = implode(", ", $userChoices["places"]);

        $activities = implode(", ", $userChoices["activities"]);

        $accommodations = implode(", ", $userChoices["accommodations"]);

        return [
            [
                'role' => 'user',
                'content' => 'Arrival date: ' . $userChoices['arrival'] .  '. Departure date: ' . $userChoices['departure'] . '. Barangays to visit: ' . $places . '. Activities to do: ' . $activities . '. Preferred accommodation type: ' . $accommodations . '. Individual count: ' . $userChoices['individual_count']
            ]
        ];
    }

    public function createTravelItinerary($response)
    {
        return Auth::user()->travelItineraries()->create([
            "title" => $response->title,
            "plan" => Crypt::encrypt($response->plan),
        ]);
    }
}