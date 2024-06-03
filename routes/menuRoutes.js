const express=require('express');
const router=express.Router();


const MenuItem=require('./../models/MenuItems');


router.post('/',async function(req,res){
    try{
      const data=req.body;
      const newmenu=new MenuItem(data);
      const savedItem=await  newmenu.save();
      console.log("menu saved succesfully");
      res.status(200).json(savedItem);
    }
    catch(error)
    {
      console.log(error);
      res.status(500).json({error:'Internal server error '});
    }
   
  })
  //get the saved menu
  router.get('/',async function(req,res){
    try{
       const data= await MenuItem.find();
       console.log("data fetched");
       res.status(200).json(data);
  
    }
    catch(error)
    {
       console.log("There is some error ");
       res.status(500).json({error:'Internal server error '});
  
    }
  })


  module.exports=router;
