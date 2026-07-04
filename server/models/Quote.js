const mongoose = require("mongoose");

const quoteSchema =
new mongoose.Schema({

  name:String,

  phone:String,

  service:String,

  address:String

},{
  timestamps:true
});

module.exports =
mongoose.model(
"Quote",
quoteSchema
);