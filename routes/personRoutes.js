const express=require('express');
const router =express.Router();
const Person=require('./../models/person');
router.post('/',async(req,res)=>{
  
    try{
   const data=req.body;//assuming requestbody contains persons data 
      //create a new person documenet using mongoose model 
      const newPerson=new Person(data);
      //save the person
      const savedPerson=await newPerson.save();
      console.log("hii i am person")
      console.log("data saved ");
      res.status(200).json(savedPerson)
    }
    catch(err){
       console.log(err);
       res.status(500).json({error:'Internal server error'});
    }
      
  
  })
  
  //get the saved user
  router.get('/',async (req,res)=>{
    try{
       const data=await Person.find();
       console.log("data fetched");
       res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server error'});
    }
  })

  router.get('/:workType',async(req,res)=>{
    try{
       const workType=req.params.workType;
       if(workType=='chef'||workType=='manager'||workType=='waiter'
       ){
        const response=await Person.find({work:workType});
        res.status(200).json(response);
       }
       else{
        res.status(404).json({error:'Invalid  Work Type '})
       }
    }
    catch(err){
      console.log(err);
      res.status(500).json({err:'Internal  Server Error '});
    }
  })
router.put('/:id',async(req,res)=>{
  try{
    //extract the id from url parameter
   const personId=req.params.id;
   const updatedPersonData=req.body;
   //update the data for the person
   const response=await  Person.findByIdAndUpdate(personId,updatedPersonData,{
    new:true,//return the updated document 
    runValidators:true,//run mongoose validation
   })
   if(!response)
    {
      return res.status(404).json({error:'person not found'})
    }
   console.log("data updated");
   res.status(200).json(response)
  }
  catch(err)
  {
    console.log(err);
      res.status(500).json({err:'Internal  Server Error '});
  }
})

//delete data
router.delete('/:id',async (req,res)=>{
  try{
    const personId=req.params.id;
    //assuming you have a person model
    const response=await Person.findByIdAndRemove(personId);
    if(!response)
      {
        return res.status(404).json({error:'Person not Found'});
      }
  }
  catch(err){
    console.log(err);
    res.status(500).json({err:'Internal  Server Error '});
  }
})




  module.exports=router;
  