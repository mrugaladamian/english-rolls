<?php

use App\Http\Controllers\RollController;

Route::get('/', [RollController::class, 'index'])->name('rolls.index');
