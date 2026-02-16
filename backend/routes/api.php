<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReadOnlyDataController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API is working']);
});
Route::get('/users', [ReadOnlyDataController::class, 'users']);
Route::get('/users/{user}/projects', [ReadOnlyDataController::class, 'userProjects']);
Route::get('/projects', [ReadOnlyDataController::class, 'projects']);
Route::get('/projects/{project}/tasks', [ReadOnlyDataController::class, 'projectTasks']);
Route::get('/board', [ReadOnlyDataController::class, 'board']);
