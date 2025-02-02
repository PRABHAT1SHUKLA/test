const express = require("express");

const fs = require("fs")
const mongoose = require("mongoose") 

const app = express();
const PORT = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/chal")
.then(() => console.log('Mongodb connected') )
.catch((err) => console.log("Mongo Error" , err));  

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type:String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
},
{timestamps: true}
);

const User = mongoose.model("user",userSchema)

app.use(express.urlencoded({ extended:false}));

app.use((req,res,next) => {
    console.log("hello middleware 1");
    next();
});


app.get('/api/users' , async(req,res) => {
    const allDbUsers = await User.find({});
 
    return res.json(allDbusers); 
});
  

app.get('/users' , async(req,res) => {
    const allDbUsers = await User.find({});
    const html =" <ul> ${allDbUsers.map((user) => '<li>$[user.firstName]/li>')}</ul>";
    res.send(html);
});




app
  .route("/api/users/:id")
  .get((req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({error:"user not found"})
    return res.json(user);
    
  })
   
    

.patch( (req,res) => {

   return res.json({status : "pending"})


})
.delete( (req,res) => {

    return res.json({status : "pending"})
 
 
 });

app.post("/api/users", async(req,res) =>  {
    const body = req.body;
    if(
        !body ||
        !body.first_name||
        !body.last_name||
        !body.email||
        !body.gender||
        !body.job_title
    ){
        return res.status(400).json({ msg: "all fields are req..."});
    }
  
   const result = await User.create({
        firstName : body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender:body.gender,
        jobTitle: body.job_title,

    });

    
    return  res.status(201).json({ msg: "success"})



    })
    
 
;




app.listen(PORT , () => console.log('server started at port 8000'))
