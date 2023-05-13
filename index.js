require('dotenv').config()

const express = require("express");
const app = express(); 
const port = 8000; 
const mongoose = require("mongoose"); 
mongoose.connect(process.env.DATABASE_URL); 
const db = mongoose.connection; 
db.on("error", function(err){
    console.log(err); 
}); 
db.once("open", function(){
     console.log("connected to database"); 
})
app.use(express.json()); 
const subscriberRouter= require("./routes/subscribers"); 
app.use("/subscribers", subscriberRouter); 

app.listen(port, function(err){
     if(err){
         console.log("error while listening on port"); 
         return; 
     }
      console.log("Server started")
})
