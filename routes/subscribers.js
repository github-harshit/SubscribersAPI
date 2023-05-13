const express = require("express"); 
const router = express.Router(); 
 const Subscriber = require("../models/subscriber"); 
 // getting all subscribers 
 router.get("/", async function(req, res){
     try{
        const subscribers  = await Subscriber.find();
         res.json(subscribers);  

     }catch(err){
         res.status(500).json({message: err.message});
     }
  
 });
 // creating new subscriber
  router.post("/", async function(req, res){
    const subscriber  = new Subscriber({
        name : req.body.name, 
        subscribedToChannel : req.body.subscribedToChannel
    }); 
    try{
        const newSubscriber = await subscriber.save(); 
        res.status(201).json(newSubscriber);

    }catch(err){
         res.status(400).json({message: err.message}); 

    }
  });
   
// getting one subscriber 
 router.get("/:id", getSubscriber,  function(req, res){
     res.send(res.subscriber); 
 })

 // deleting one subscriber 
 router.delete("/:id", getSubscriber, async function(req, res){
     try{
         let id  = req.params.id; 
         await Subscriber.findByIdAndDelete(id); 
        return res.status(200).json({message : "Subscriber deleted "}); 
         
     }catch(err){
          res.status(500).json({message: err.message})
     }
 }); 


 // updating one subscriber 
  router.patch("/:id",  async function(req, res){

    let  subs =  await Subscriber.findById(req.params.id); 
    if(req.body.name!=null){
         subs.name = req.body.name
    }
     if(req.body.subscribedToChannel!=null){
         subs.subscribedToChannel = req.body.subscribedToChannel; 
     }
      try{
         const updatedSubscriber = await subs.save(); 
         res.json(updatedSubscriber)
      }catch(err){
         res.status(400).json({message: err.message}); 
      }
  })



 async function getSubscriber(req, res,next){
    try{
        subscriber = await Subscriber.findById(req.params.id); 
        if(subscriber==null){
             return res.status(404).json({message: "Cannot find subscriber"}); 
        }
    }catch(err){
        return res.status(500).json({message: err.message})
         
         
    }
     res.subscriber =subscriber; 
     next(); 
 }

 module.exports= router; 
