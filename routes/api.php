<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API;


use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\Auth\LoginAPIController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('posts',PostController::class);

Route::get('auth/create-token',[LoginAPIController::class,'createtoken']);

Route::post('auth/login',[LoginAPIController::class,'login']);
Route::post('auth/register',[LoginAPIController::class,'register']);

