@extends('layouts.rolls')
@section('title', 'Rolls')
@section('content')
    <div x-data="window.Rolls()">
        <img class="speak-image-kind" :src="loudspeakerIcon" alt="speak" @click="isSpeak = !isSpeak"
            :class="isSpeak ? 'opacity-100' : 'opacity-20'">
        <div class="text-center h-[calc(100vh-28vh)]" x-show="isPlContent" @click.stop="rollPlContentClick()">
            <h1 x-text="rolls[0].pl"></h1>
        </div>
        <div class="text-center h-[calc(100vh-28vh)]" x-show="!isPlContent" @click.stop="nextRoll()">
            <h1 x-text="rolls[0].en"></h1>
            <h2 x-text="rolls[0].phonetic"></h2>
            <button class="passed-button-kind" @click.stop="passedRoll()">✓</button>
        </div>
        <h3 class="rolls-length-text-kind" x-text="rolls.length" @click.stop="rollsLengthTextClick()"></h3>
    </div>
@endsection
