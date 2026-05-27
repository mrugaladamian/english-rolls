<?php

use App\Http\Controllers\RollController;
use App\Http\Controllers\HomeController;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('/rolls', [RollController::class, 'index'])->name('rolls.index');
