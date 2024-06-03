const express=require("express");
const app=express();
const db=require('./db')
require('dotenv').config();
//we know that user can send data from  frontend in any fromat for that in order to filter out we will use body parser
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT ||3000


const Person=require('./models/person');
const MenuItem=require('./models/MenuItems');



app.get('/',function(req,res){
    res.send("welcomr to my hotel");
})




//it  will help to send  menu Item to the database from the user 

//import the person routes
const personRoutes=require('./routes/personRoutes');
app.use('/person',personRoutes);


const menuRoutes=require('./routes/menuRoutes');
app.use('/menu',menuRoutes)



console.log("hello")
app.listen(PORT,()=>{
    console.log("listening on port 3000")
})