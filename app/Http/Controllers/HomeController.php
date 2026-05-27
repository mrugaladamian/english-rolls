<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        return view('home.index', [
            'previewRolls' => $this->previewRollsForHome(),
        ]);
    }

    private function previewRollsForHome(): array
    {
        $rolls = $this->previewRolls();
        if ($rolls === []) {
            $rolls = [['pl' => 'porzucić', 'en' => 'abandon', 'phonetic' => 'a-BAN-den']];
        }
        shuffle($rolls);
        return array_slice($rolls, 0, 30);
    }

    private function previewRolls(): array
    {
        $source = file_get_contents(resource_path('js/constants.js'));
        preg_match_all('/\{\s*id:\s*\d+,\s*pl:\s*"([^"]+)",\s*en:\s*"([^"]+)",\s*phonetic:\s*"([^"]+)"/s', $source, $matches, PREG_SET_ORDER);
        return array_map(fn (array $match): array => [
            'pl' => $match[1],
            'en' => $match[2],
            'phonetic' => $match[3],
        ], $matches);
    }
}
