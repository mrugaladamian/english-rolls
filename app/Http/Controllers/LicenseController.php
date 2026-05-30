<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class LicenseController extends Controller
{
    public function show(): Response
    {
        $path = base_path('LICENSE');
        if (! file_exists($path)) {
            abort(404);
        }
        return response()->file($path, ['Content-Type' => 'text/plain; charset=UTF-8']);
    }
}
