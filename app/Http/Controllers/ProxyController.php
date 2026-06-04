<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProxyController extends Controller
{
    public function fetch(Request $request, string $url)
    {
        $url = 'https://www.' . $url;
        return file_get_contents($url);
    }
    
}
