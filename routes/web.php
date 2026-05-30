<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\LicenseController;
use App\Http\Controllers\RollController;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('/rolls', [RollController::class, 'index'])->name('rolls.index');
Route::get('/license', [LicenseController::class, 'show'])->name('license');
