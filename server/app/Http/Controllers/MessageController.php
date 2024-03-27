<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Services\ChatbotService;
use App\Services\MessageService;
use App\Http\Requests\Chat\ChatStoreRequest;

class MessageController extends Controller
{
    private $chatbotService;
    private $messageService;

    public function __construct(ChatbotService $chatbotService, MessageService $messageService)
    {
        $this->chatbotService = $chatbotService;
        $this->messageService = $messageService;
    }

    public function store(ChatStoreRequest $request, Chat $chat)
    {
        $previousMessages = $this->messageService->getPreviousMessages($chat);

        $allMessages = $this->messageService->initializeAllMessages(
            $previousMessages, 
            $request->validated('message')
        );

        $data = $this->chatbotService->initializeData($allMessages, $this->chatbotService->chatbotInitilaMessage);

        $response = $this->chatbotService->generateResponse($data);

        $message = $this->messageService->createMessages(
            $request->validated('message'),
            $response->content,
            $chat
        );

        $this->messageService->addMessageToSession($message, $chat);

        return response([
            'chat_id' => $chat->id,
            'messages' => $message
        ]);
    }
}
