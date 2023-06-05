const mongoose=require('mongoose');
const Review = require('./review');
const Schema=mongoose.Schema;

const HotelSchema=new Schema({
  name:String,
  location:String,
	state : String,
	city : String,
  country : String,
  image: String,
  price: Number,
  description: String,
  latitude: Number,
  longitude: Number,
  author:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:'Review'
    }
  ]
});

HotelSchema.post('findOneAndDelete', async function(doc){
  if(doc){
    await Review.deleteMany({
      _id:{
        $in:doc.reviews
      }
    })
  }
})

module.exports=mongoose.model('Hotel',HotelSchema);
