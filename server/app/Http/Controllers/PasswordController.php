<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\PasswordUpdateRequest;

class PasswordController extends Controller
{
    public function update(PasswordUpdateRequest $request)
    {
        $request->user()->update([
            'password' => Hash::make($request->validated('password')),
        ]);

        return response()->noContent();
    }
}
