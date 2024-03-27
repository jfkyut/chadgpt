<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Services\ChatService;
use App\Services\ChatbotService;
use App\Services\MessageService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\Chat\ChatStoreRequest;
use App\Http\Requests\Chat\ChatUpdateRequest;

class ChatController extends Controller
{
    private $chatbotService;
    private $messageService;
    private $chatService;

    public function __construct(
        ChatbotService $chatbotService, 
        MessageService $messageService,
        ChatService $chatService
    )
    {
        $this->chatbotService = $chatbotService;
        $this->messageService = $messageService;
        $this->chatService = $chatService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Auth::user()
                    ->chats()
                    ->latest()
                    ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ChatStoreRequest $request)
    {
        $newMessage = $this->messageService->initializeFirstMessage($request->validated('message'));

        $data = $this->chatbotService->initializeData($newMessage, $this->chatbotService->chatbotInitilaMessage);
        
        $response = $this->chatbotService->generateResponse($data);

        $chat = $this->chatService->createChat($response->title);

        $message = $this->messageService->createMessages(
            $request->validated('message'), 
            $response->content, 
            $chat
        );

        $this->messageService->addMessageToSession($message, $chat);

        return response($chat->find($chat->id)->load('messages'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Chat $chat)
    {
        return $chat->where('id', $chat->id)
                    ->with('messages')
                    ->first();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ChatUpdateRequest $request, Chat $chat)
    {
        $chat->update($request->validated());
        $chat->save();

        return $chat;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chat $chat)
    {
        $chat->delete();

        return response()->noContent();
    }

    public function destroyAll()
    {
        Auth::user()->chats()->delete();

        return response()->noContent();
    }
}
