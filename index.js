const express = require('express');
const dotenv = require('dotenv');
const {userRoute} = require('./routes/users.route');
const {connection} = require('./configs/db')
const {Authentication} = require('./middlewares/Authentication.middleware');
const { postRoute } = require('./routes/posts.route');

dotenv.config()

const app = express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Home Page')
})

app.use('/users',userRoute);
app.use(Authentication);
app.use('/posts',postRoute)

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log('connected to db')
    }catch(err){
        console.log('db not connected')
    }
    console.log('server in port')
})