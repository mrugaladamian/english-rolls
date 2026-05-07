<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\RollController;

Route::get('/', [HomeController::class, 'index'])->name('HomeControllerIndex');
Route::get('/rolls', [RollController::class, 'index'])->name('rolls.index');
