<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Http\Requests\Profile\ProfileDestroyRequest;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        return $request->user();
    }

    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return response()->noContent();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(ProfileDestroyRequest $request)
    {
        $user = $request->user();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
