const mongoose=require('mongoose')
  

const signupSchema=mongoose.Schema({
      username:String,
      password:String,
      Firstname:String,
      Lastname:String,
      Email:String,
      Mobilenumber:Number,
      Gender:String,
      Password:String,
      createdDate:{type:Date,default:new Date()},
      status:{type:String,default:'active'}
   
      
     
})

module.exports=mongoose.model("signup",signupSchema)