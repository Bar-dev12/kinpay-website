<?php

namespace App\Http\Controllers;

use App\Mail\SupportMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Models\SupportTicket;

class SupportController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
        ]);

        SupportTicket::create($validated);

        Mail::to('jeremiebart02@congoleseyouth.cd')
            ->send(new SupportMessageMail($validated));

        return back()->with([
            'success' => 'Votre message a été envoyé avec succès.'
        ]);
    }
}
