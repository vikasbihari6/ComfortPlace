const Joi=require('joi');
const { models } = require('mongoose');

module.exports.hotelSchema=Joi.object({
  hotel:Joi.object({
    name:Joi.string().required(),
    price:Joi.number().required().min(1),
    image:Joi.string().required(),
    city:Joi.string().required(),
    country:Joi.string().required(),
    description:Joi.string().required(),     
  }).required()
})

module.exports.reviewSchema=Joi.object({
  review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    body:Joi.string().required()
  }).required()
})