const express = require('express');
const {UserModel} = require('../models/users.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')

dotenv.config()

const userRoute = express.Router();

userRoute.get('/',(req,res)=>{
    res.send('User Route')
})

userRoute.post('/register',async(req,res)=>{
    const {name,email ,gender ,password } = req.body;
    try{
        const user = await UserModel.find({email});
        if(user.length>0){
            res.send("user already exists, try another email id")
        }else{
            bcrypt.hash(password,5, async(err, hash)=> {
                if(err){
                    console.log(err,process.env.saltRounds)
                    res.send({"err":"something went wrong"})
                }else{
                    const new_user = new UserModel({name,email,gender,password:hash});
                    await new_user.save();
                    res.send("user got registered")
                }
            });
        }
    }catch(err){
        console.log(err)
        res.send({"err":"something went wrong"})
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email ,password } = req.body;
    const id = req.headers.id;
    try{
        const user = await UserModel.find({email});
        let user_pass = user[0].password;
        bcrypt.compare(password, user_pass, (err, result) =>{
            const iiid=user[0].id;
            if(result){
                console.log(iiid)
                const token = jwt.sign({userId:iiid}, process.env.key);
                res.send({"msg":"login successful","token":token});
            }else{
                    res.send({"err":"wrong password"})
            }
        });
    }catch(err){
        console.log(err)
        res.send({"err":"something went wrong"})
    }
})

module.exports = {
    userRoute
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2M1MWE5YjJhNzBiODU5OGEwZjFjMWIiLCJpYXQiOjE2NzM4NjQwNjV9.l9VxCKY9F-xMJy03ezTmj3eJ27IN1lcoWH9MfFr2xp4

// {
//     "name":"satisha",
//     "email":"satisha@gmail" ,
//     "gender":"male" ,
//     "password":"r"
//   }