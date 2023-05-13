const mongoose = require("mongoose"); 
const subscriberSchema = new mongoose.Schema({
    name: {
         type: String, 
         required: true
    }, 
    subscribedToChannel: {
         type: String, 
         required: true
    }, 
    subscriberDate: {
        type :Date, 
        required: true, 
        default: Date.now
    }
}); 
const Subscriber = mongoose.model("Subscriber", subscriberSchema); 
module.exports= Subscriber; 