<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class LoginAPIController extends Controller
{
    public function createtoken(){
        $user = User::first();
        $accessToken = $user->createToken('Token Name')->accessToken;
        return $accessToken;

    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password'=>'required',
           
        ],[
            'email.required'=>'Please enter an email',
            'password.required'=>'Please enter password'
        ]);

        if($validator->fails()){
            return response()->json([
              'success'=>false,
              'errors'=>$validator->getMessageBag()
            ]);
        }

        $credentials = [
            'email' => $request->email,
            'password' =>$request->password,
        ];

        if(Auth::attempt($credentials)){

           
           $user = User::where('email',$request->email)->first();
           $accessToken = $user->createToken('Token Name')->accessToken;
           return response()->json([
            'success'=>true,
            'message'=>'Logged In Successfully',
            'accessToken'=> $accessToken ,
            'user' => $user
           
          ]);
           
        }else{

            
           
            return response()->json([
                'success'=>false,
                'errors'=>'Invalid email/password'
              ]);
        }

       

    }

    public function register(Request $request){
        $validator = \Validator::make($request->all(), [
            'name'=>'required',
            'email' => 'required|email|unique:users',
            'password'=>'required|confirmed',
           
        ],[
            'name.required'=>'Please enter your name',
            'email.required'=>'Please enter an email',
            'email.unique'=>'Your email address already in use',
            'password.required'=>'Please enter password'
        ]);

        if($validator->fails()){
            return response()->json([
              'success'=>false,
              'errors'=>$validator->getMessageBag()
            ]);
        }

        $user = new User();
        $user->name= $request->name;
        $user->email = $request->email;
        $user->password= Hash::make($request->password);
        $user->save();

        if(!is_null($user)){
            $user = User::where('email',$request->email)->first();
            $accessToken = $user->createToken('Token Name')->accessToken;
           return response()->json([
            'success'=>true,
            'message'=>'Logged In Successfully',
            'accessToken'=> $accessToken,
            'user'=>$user
           
          ]);
           
        }else{

            return response()->json([
                'success'=>false,
                'message'=>'Registration cannot successful',
                'errors'=>null
              ]);
        }

       

    }
}
