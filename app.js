const express=require('express');
const path=require('path')
const mongoose=require('mongoose')
const ejsMate=require('ejs-mate')
const Joi=require('joi')
const {hotelSchema,reviewSchema}=require('./schemas.js')
const methodOverride=require('method-override');
const catchAsync=require('./utils/catchAsync')
const flash=require('connect-flash')
const ExpressError=require('./utils/ExpressError')
const Hotel=require('./models/hotel')
const Review=require('./models/review');
const hotel = require('./models/hotel');
const session=require('express-session')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const User=require('./models/user')

const userRoutes=require('./routes/users')
const hotelRoutes=require('./routes/hotels')
const reviewRoutes=require('./routes/reviews')


mongoose.connect(`mongodb+srv://vikasbihari6:admin@cluster0.waggvse.mongodb.net/`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify:false
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));

db.once("open",()=>{
  console.log("DATABASE CONNECTED")
})

const app=express();

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))

const sessionConfig={
  secret:'himehul',
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    expires:Date.now() +1000*60*60, 
    maxAge:1000*60*60
  }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser()) 
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
  res.locals.currentUser=req.user
  res.locals.success=req.flash('success')
  res.locals.error=req.flash('error')
  next()
})

app.get('/')

app.use('/',userRoutes)
app.use('/',hotelRoutes)
app.use('/hotels/:id/reviews',reviewRoutes)

app.get('/',(req,res)=>{
  res.render('home')
})  

app.all('*',(req,res,next)=>{
  next(new ExpressError('Page not found',404))
})

app.use((err,req,res,next)=>{
 const {statusCode=500}=err;
 if(!err.message) err.message='something is fishy'
 res.status(statusCode).render('error',{err})
})

const port=process.env.port||8080
app.listen(port,()=>{
  console.log('serving on the port')
})  
