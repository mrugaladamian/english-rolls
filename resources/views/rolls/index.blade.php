@extends('layouts.rolls')
@section('title', 'Rolls')
@section('content')
<div class="text-center" 
     x-data="{ showEnglish: false, rolls: [] }" 
     x-init="initializeRolls()"
     x-effect="rolls = this.rolls || []">

    <div @click="showEnglish = true" class="cursor-pointer" x-show="!showEnglish">
        <h1 id="rolls-pl-text" class="text-3xl font-medium" 
            x-text="rolls[0]?.polish || 'Brak słowa'">
        </h1>
    </div>

    <div x-show="showEnglish" @click="showEnglish = false">
        <h2 id="rolls-en-text" class="text-3xl font-medium" 
            x-text="rolls[0]?.english || 'Word in English'"></h2>
        <h3 id="rolls-phonetic-text" class="text-xl mb-10" 
            x-text="rolls[0]?.phonetic || '/wymowa/'"></h3>

        <button @click="window.passedButton()" class="passed-button-kind">
            ✓
        </button>
    </div>
</div>
@endsection
