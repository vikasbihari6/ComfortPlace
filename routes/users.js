const express=require('express')
const router=express.Router()
const User=require('../models/user')
const catchAsync=require('../utils/catchAsync')
const {remove}=require('../models/user')
const passport = require('passport')

router.get('/register',(req,res)=>{
  res.render('users/register')
})

router.post('/register',catchAsync(async(req,res)=>{
  try{
  const {email,username,password}=req.body
  const user=new User({email,username})
  const registeredUser=await User.register(user,password)
  req.login(registeredUser,err=>{
    
    if(err) return next(err)
    req.flash('success','Welcome Welcome Welcome Dosto ')
    res.redirect('/hotels')
  })
  } catch(e){
    req.flash('error',e.message)
    res.redirect('register')
  }
}))

router.get('/login',(req,res)=>{
  res.render('users/login')
})

router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
  req.flash('success','Welcome back')
  const redirectUrl=req.session.returnTo||'/hotels'
  delete req.session.returnTo
  res.redirect(redirectUrl)
})

router.get('/logout',(req,res)=>{
  req.logout()
  req.flash('success',"Goodbye, visit again :)")
  res.redirect('/hotels')
})

module.exports=router;