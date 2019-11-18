const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    _id : {type : mongoose.Schema.ObjectId,required: false},
    id: {
      type:String,
      allowNull: false,
      primaryKey: true,
    },
	  code : String,
	  state : String,
	  name : String,
	  depth : String,
    bannersCount : String,
    banners : String
  })
);

module.exports = Category;
