<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class ChatService
{
    public function createChat($title)
    {
        return Auth::user()
                    ->chats()
                    ->create(['title' => $title]);
    }
}