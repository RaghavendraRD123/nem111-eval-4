const express = require('express');
const {PostModel} = require('../models/posts.model')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

const postRoute = express.Router();

postRoute.get('/',async(req,res)=>{
    try{
        const posts = await PostModel.find();
        res.send(posts)
    }catch(err){
        res.send({"err":"something went wrong"})
    }
})

postRoute.post('/',async(req,res)=>{
    const payload = req.body;
    try{
        let post = new PostModel(payload)
        await post.save();
        res.send(post)
    }catch(err){
        res.send({"err":"something went wrong"})
    }
})

postRoute.patch('/update/:id',async(req,res)=>{
    const payload = req.body;
    const id =req.params.id;
    const req_user = req.body.userId;
    try{
        const post = await PostModel.findOne({_id:id});
        if(post.userId===req_user){
            console.log("patch:",post.userId,req_user)
            await PostModel.findByIdAndUpdate(id,payload);
            res.send("updated")
        }else{
            res.send({"err":"not authorised"})
        }
    }catch(err){
        res.send({"err":"something went wrong patch2"})
    }
})

postRoute.delete('/delete/:id',async(req,res)=>{
    const id =req.params.id;
    const req_user = req.body.userId;
    try{
        const post = await PostModel.findOne({_id:id});
        if(post.userId===req_user){
            console.log(post.userId,req_user)
            await PostModel.findByIdAndDelete(id);
            res.send("deleted")
        }else{
            res.send({"err":"something went wrong"})
        }
    }catch(err){
        res.send({"err":"something went wrong"})
    }
})



module.exports = {
    postRoute
}