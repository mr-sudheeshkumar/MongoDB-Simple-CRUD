const mongoose = require("mongoose");

//Series's Schema
const seriesSchema = mongoose.Schema({
    seriesid : String,
    title : String,
    category : [{type:String}], //Array of String
    platformid : [{type:String}]  //Array of String
});

const seriesModel = mongoose.model("series",seriesSchema,"series");

module.exports =  seriesModel;