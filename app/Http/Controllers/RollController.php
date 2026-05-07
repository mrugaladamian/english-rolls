<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class RollController extends Controller
{
    public function index(): View
    {
        return view('rolls.index');
    }
}