const mongoose = require("mongoose");

//Platform's Schema
const platformSchema = mongoose.Schema({
    platformid : String,
    title : String,
});

const platformModel = mongoose.model("platforms",platformSchema,"platforms");

module.exports =  platformModel;