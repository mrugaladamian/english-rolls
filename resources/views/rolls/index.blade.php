@extends('layouts.rolls')
@section('title', 'Rolls')
@section('content')
    <div class="rolls-touch-surface" x-data="window.Rolls()" @pointerdown="swipeStart($event)"
        @pointerup="swipeEnd($event, $refs.backgroundVideo)" @pointercancel="swipeCancel()">
        <video class="background-video" x-ref="backgroundVideo" loop autoplay playsinline preload="auto"></video>
        <div class="video-jump-text-kind" x-show="isVideoJumpVisible" x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="opacity-0 scale-90" x-transition:enter-end="opacity-100 scale-100"
            x-transition:leave="transition ease-in duration-500" x-transition:leave-start="opacity-100 scale-100"
            x-transition:leave-end="opacity-0 scale-90" x-text="videoJumpText"></div>
        <div class="rolls-icons">
            <img class="option-icon" :src="loudspeakerIcon" alt="speak" @click="isSpeak = !isSpeak"
                :class="isSpeak ? 'opacity-100' : 'opacity-20'">
            <img class="option-icon" :src="filmIcon" alt="film"
                @click="videoIconClick($refs.videoInput, $refs.backgroundVideo)"
                :class="isVideo ? 'opacity-100' : 'opacity-20'">
            <input class="background-video-input" type="file" accept="video/*" x-ref="videoInput"
                @change="loadBackgroundVideo($event, $refs.backgroundVideo)">
        </div>
        <div class="roll-content-layer" x-show="isPlContent" @click.stop="rollPlContentClick()">
            <div class="roll-content-text">
                <h1 class="roll-content-title" x-text="rolls[0].pl"></h1>
            </div>
        </div>
        <div class="roll-content-layer" x-show="!isPlContent" @click.stop="nextRoll()">
            <div class="roll-content-text">
                <h1 class="roll-content-title" x-text="rolls[0].en"></h1>
                <h2 class="roll-content-phonetic" x-text="rolls[0].phonetic"></h2>
            </div>
            <button class="passed-button-kind" @click.stop="passedRoll()">✓</button>
        </div>
        <h3 class="rolls-length-text-kind" x-text="rolls.length" @click.stop="rollsLengthTextClick()"></h3>
    </div>
@endsection
