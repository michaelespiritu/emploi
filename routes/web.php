<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobListingsController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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

Route::middleware('auth')->prefix('company')->group(function () {
    Route::get('/', [CompanyController::class, 'index'])->name('company.index');
    Route::get('/buy-token', [CompanyController::class, 'getBuyToken'])->name('company.get.buy.token');
    Route::post('/buy-token', [CompanyController::class, 'postBuyToken'])->name('company.post.buy.token');
});

Route::middleware('auth')->prefix('company/jobs')->group(function () {
    Route::get('/', [JobListingsController::class, 'index'])->name('job.index');
    Route::get('/create', [JobListingsController::class, 'create'])->name('job.create');
    Route::post('/create', [JobListingsController::class, 'store'])->name('job.store');
    Route::get('/{jobListing}', [JobListingsController::class, 'show'])->name('job.show');
    Route::get('/edit/{jobListing}', [JobListingsController::class, 'edit'])->name('job.edit');
    Route::patch('/edit/{jobListing}', [JobListingsController::class, 'update'])->name('job.update');
    Route::delete('/{jobListing}', [JobListingsController::class, 'destroy'])->name('job.destroy');
    Route::get('/categories', [JobListingsController::class, 'categories'])->name('job.categories');
});

require __DIR__ . '/auth.php';
