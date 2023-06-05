const mongoose=require('mongoose');
const cities=require('./cities')
const names=require('./names')
const description=require('./description')
const Hotel=require('../models/hotel')
const fetch = require("node-fetch");

mongoose.connect('mongodb://localhost:27017/hotels',{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));

db.once("open",()=>{
  console.log("DATABASE CONNECTED")
})

const seedDB=async()=>{
  await Hotel.deleteMany({});
  for(let i=0;i<10;i++){
    const price=Math.floor(Math.random()*200);
    const hot=new Hotel({
      author:'5fe47779f7a41581f4a45352',
      name:`${names[i].name}`,
      city:`${cities[i].District}`,
      country:'India',
      image:'https://unsplash.com/photos/41D3oPlRbHQ',
      description:`${description[i].description}`,
      price,
      latitude:'',
      longitude:''
    })
  const found=await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cities[i].District}%2C%20India&key=1dadbfcc45314decbda9a7bdbc60a6c4`)
  const data= await found.json();
  const {lat,lng} =data.results[0].geometry;
  hot.latitude=lat;
  hot.longitude=lng;
  await hot.save();
  }
}

seedDB().then(()=>{
  mongoose.connection.close();
});