const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
  body:String,
  rating:Number,
  author:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  time:
  {
     hours:Number,
     day:Number,
     month:Number,
     year:Number
  }
});

module.exports=mongoose.model("Review",reviewSchema);

