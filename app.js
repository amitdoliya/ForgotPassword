const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))

const mongoose=require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/login")

  const session= require("express-session")
   app.use(session({
       secret:"amit",
       resave:false,
       saveUninitialized:false
   }))

const loginRouter=require("./routers/api")
 const adminRouter=require("./routers/admin")



app.use(loginRouter)
app.use("/admin",adminRouter)
app.set("view engine","ejs")
app.use(express.static('public'))
app.listen(5000,()=>{console.log("server is connected")})