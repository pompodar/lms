<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('courses', CourseController::class)->middleware(['web']);

Route::post('/courses/reorder', [CourseController::class, 'reorder'])->name('courses.reorder');

Route::prefix('courses/{course}')->group(function () {
    Route::resource('lessons', LessonController::class)->except(['index']);
    Route::post('share', [CourseController::class, 'share'])->name('courses.share');
    Route::post('lessons/reorder', [LessonController::class, 'reorder'])->name('lessons.reorder');

})->middleware(['web']);

require __DIR__.'/auth.php';
