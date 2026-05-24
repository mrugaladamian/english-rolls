@extends('layouts.rolls')
@section('title', 'Rolls')
@section('content')
    <div class="touch-pan-y" x-data="window.Rolls()" @pointerdown="swipeStart($event)"
        @pointerup="swipeEnd($event, $refs.backgroundVideo)" @pointercancel="swipeCancel()">
        <video x-ref="backgroundVideo" loop autoplay playsinline preload="auto"></video>
        <div class="rolls-icons">
            <img class="option-icon" :src="loudspeakerIcon" alt="speak" @click="isSpeak = !isSpeak"
                :class="isSpeak ? 'opacity-100' : 'opacity-20'">
            <img class="option-icon" :src="filmIcon" alt="film"
                @click="videoIconClick($refs.videoInput, $refs.backgroundVideo)"
                :class="isVideo ? 'opacity-100' : 'opacity-20'">
            <input class="hidden" type="file" accept="video/*" x-ref="videoInput"
                @change="loadBackgroundVideo($event, $refs.backgroundVideo)">
        </div>
        <div class="fixed inset-0 z-10" x-show="isPlContent" @click.stop="rollPlContentClick()">
            <div class="absolute left-0 top-[24vh] w-screen px-6 text-center">
                <h1 x-text="rolls[0].pl"></h1>
            </div>
        </div>
        <div class="fixed inset-0 z-10" x-show="!isPlContent" @click.stop="nextRoll()">
            <div class="absolute left-0 top-[24vh] w-screen px-6 text-center">
                <h1 x-text="rolls[0].en"></h1>
                <h2 x-text="rolls[0].phonetic"></h2>
            </div>
            <button class="passed-button-kind" @click.stop="passedRoll()">✓</button>
        </div>
        <h3 class="rolls-length-text-kind" x-text="rolls.length" @click.stop="rollsLengthTextClick()"></h3>
    </div>
@endsection
