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
                'content' => 'You are ChadGPT. Reply in a json format, make sure to always include whitespaces (\\n). format: ' . Storage::get("chatbot.json"),
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