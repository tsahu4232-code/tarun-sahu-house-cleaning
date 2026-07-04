const Quote =
require("../models/Quote");

exports.createQuote =
async(req,res)=>{

const quote =
await Quote.create(
req.body
);

res.json(quote);

};