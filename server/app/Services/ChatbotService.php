<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ChatbotService
{
    public $chatbotInitilaMessage = null;
    public $travelGeneratorInitialMessage = null;

    public function __construct()
    {
        $this->chatbotInitilaMessage = [
            [
                'role' => 'system',
                'content' => 'You are ChadGPT, Virtual Tourist Assistant Chatbot. Reply in a json format, make sure to always include whitespaces (\\n). format: ' . Storage::get("chatbot.json"),
            ]
        ];

        $this->travelGeneratorInitialMessage = [
            [
                'role' => 'system',
                'content' => 'You are Travel Itinerary Generator. Generate a travel itinerary base on the user input. Detail every activity from date of arrival, checkin (always include), transportation between barangays (Please fucking always include this when there is more than 1 barangay to have smooth transition of activities between barangays and not produce a not realistic situation. I keep tweaking the prompt, please listen.), dining, checkout (always include), suggest for both inclusions and exclusions (this can be anything, you can be creative of at least putting something in both fields), suggest accommodation base on user preference, departure and include it in daily activities if necessary. Reply in a json format. format: ' . Storage::get("travel.json"),
            ]
        ];
    }

    public function initializeData(array $messages, array $initialMessage): array
    {
        return [
            'model' => env('OPENAI_MODEL'),
            'messages' => array_merge($initialMessage, $messages),
            "response_format" => [
                "type" => "json_object"
            ]
        ];
    }

    public function generateResponse(array $data)
    {
        $response = Http::withHeaders([
            "Content-type" => "application/json",
            "Authorization" => "Bearer " . env('OPENAI_KEY'),
        ])->timeout(60)
          ->post(env("OPENAI_ENDPOINT"), $data);

        return $response->ok()
            ? json_decode($response->json()['choices'][0]['message']['content'])
            : abort(500, 'Somewthing went wrong.');
    }
}