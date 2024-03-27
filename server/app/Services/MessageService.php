<?php

namespace App\Services;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class MessageService
{
	public function createMessages(string $userMessage, string $chatbotMessage, Chat $chat)
	{
		$message = new Message([
			'user_message' => $userMessage,
			'chatbot_message' => $chatbotMessage
		]);

		$message->user()->associate(Auth::user());
		$message->chat()->associate($chat);
		$message->save();

		return $message->where('id', $message->id)
                        ->without('user')
                        ->first();
	}

	public function initializeFirstMessage($message)
	{
		return [
            [
                'role' => 'user',
                'content' => $message
            ]
        ];
	}

	public function initializeAllMessages($previousMessages, $newMesage)
	{
		$allMessages = [];

        foreach ($previousMessages as $previousMessage) {
            $allMessages[] = [
                'role' => 'user',
                'content' => $previousMessage['user_message']
            ];

            $allMessages[] = [
                'role' => 'assistant',
                'content' => $previousMessage['chatbot_message']
            ];
        }
        
        $newMessage = [
            'role' => 'user',
            'content' => $newMesage
        ];

        $allMessages[] = $newMessage;

		return $allMessages;
	}

	public function getPreviousMessages($chat)
	{
		$previousMessages = Session::get($chat->id);

		if (!$previousMessages || count($previousMessages) === 0) {
			$messages = Message::where('chat_id', $chat->id)->get();

			foreach ($messages as $message) {
				$previousMessages[] = [
					'user_message' => $message['user_message'],
					'chatbot_message' => $message['chatbot_message']
				];
			}
		}
    
    	if (count($previousMessages) >= 5) {
			$previousMessages = array_slice($previousMessages, count($previousMessages) - 5);
		}

		return $previousMessages;
	}

	public function addMessageToSession($message, $chat)
	{
		$messages[] = [
            'user_message' => $message['user_message'],
            'chatbot_message' => $message['chatbot_message']
        ];

        Session::put($chat->id, $messages);
	}
}