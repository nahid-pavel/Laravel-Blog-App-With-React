<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();



        return response()->json([
            'success' => true,
            'message' =>'Project List',
            'data' => $posts
        ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description'=>'required',
            'user_id'=>'required'
        ],[
            'title.required'=>'Please enter a title',
            'description.required'=>'Please enter description'
        ]);

        if($validator->fails()){
            return response()->json([
              'success'=>false,
              'errors'=>$validator->getMessageBag()
            ]);
        }
        
        $post = new Post();
        $post->title= $request->title;
        $post->description= $request->description;
        $post->user_id= 1;
        $post->save();
        return response()->json([
            'success'=>true,
            'message'=>'Post Created',
            'data'=>$post
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);

        if(is_null($post)){
             response()->json([
                'success' => false,
                'data' => null
            ]); 
        }
        
        return response()->json([
            'success' => true,
            'data' => $post
        ]);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $post = Post::find($id);
        if(is_null($post)){
           return response()->json([
               'success'=>'false',
               'message'=>'Post not found',
               'data'=>null
            ]);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'description'=>'required',
            
        ],[
            'title.required'=>'Please enter a title',
            'description.required'=>'Please enter description'
        ]);

        if($validator->fails()){
           return response()->json([
              'success'=>false,
              'errors'=>$validator->getMessageBag()
            ]);
        }
        

        
        $post->title= $request->title;
        $post->description= $request->description;
        $post->user_id= $request->user_id;
        $post->save();

        return response()->json([
            'success' => true,
            'message'=>'post updated',
            'data' => $post
        ]);


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {    
        $post = Post::find($id);
        if(is_null($post)){
        return response()->json([
            'success'=>'false',
            'message'=>'Post not found',
            
         ]);
     }
        //
       
        $post->delete();
        return response()->json([
            'success'=>'true',
            'message'=>'Post Deleted'
            
         ]);
    }
}
