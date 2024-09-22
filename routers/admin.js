const router=require('express').Router()

const adminpanel=require('../models/adminpanel')
const signup = require('../Models/signup')

function handlelogin(req,res,next){
    if(req.session.isAuth){
        next()
    }else(
        res.redirect('/admin')
    )
    }






router.get('/',(req,res)=>{
      res.render("admin/adminpanel.ejs")
  })
  router.post("/adminpanelrecord",async(req,res)=>{
    console.log(req.body)
       const{us,pass}=req.body
      const record= await  adminpanel.findOne({username:us})
        if(record!==null){
            if(record.password==pass){
            req.session.isAuth=true
     
              
                res.redirect('/admin/dashboard')
            }else{
            res.redirect('/admin/')
        }
       
        }else{
            res.redirect('/admin/')
        }
        

          
    })
        
       
        
    
     router.get("/dashboard",async(req,res)=>{
     //console.log(req.body)
          const record=await signup.find().sort({createdDate:-1})
         // const totaldashboard=await signup.count()
         //console.log(record);
           res.render("dashboard.ejs",{record})
       })



       router.get("/username",async(req,res)=>{
        //console.log(req.body)
             const record=await signup.find().sort({createdDate:-1})
            // const totaldashboard=await signup.count()
            //console.log(record);
              res.render("username.ejs",{record})
          })
       router.get('/signupdelete/:abc',async(req,res)=>{
     //console.log(req.params.abc)
        const id=req.params.abc
         await signup.findByIdAndDelete(id)
       res.redirect('/admin/dashboard')

       })
       router.get('/signupupdate/:id',async(req,res)=>{
      
        const id=req.params.id
        //console.log(req.params.id)
        const record=await signup.findById(id)
        //console.log(record)
        let newstatus=null
        if(record.status=='active'){
            newstatus='suspended'
        }else{
            newstatus='active'
        }
        await signup.findByIdAndUpdate(id,{status:newstatus})
        res.redirect('/admin/dashboard')
       })

       router.get('/logout',(req,res)=>{
        req.session.destroy()
        res.redirect('/admin/')
    })
     
          











module.exports=router