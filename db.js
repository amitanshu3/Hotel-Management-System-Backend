const mongoose=require('mongoose');
 //define the mongodb url
 
 const mongourl='mongodb://127.0.0.1:27017/hotels';
 
 //set mongodb connection
 mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
 })

 //get the default connection
   //mongoose maintain  a default connection object representing the mongodb connection 
   const db=mongoose.connection;

   //define event listners for data base connection 
   db.on('connected',()=>{
    console.log("Connected to mongodb server")
   })
   db.on('error',(err)=>{
    console.log("Mongodb connection error:",err);

   })
   db.on('disconnected',()=>{
    console.log("Mongodb disconnected")
   })

   //export the database connection 
   module.exports=db;
