const express= require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")


const app= express()
app.use(express.json())

// name ==> String
// email ==> String
// gender ==> String
// password ==> String
// age ==> Number
// city ==> String
// is_married ==> boolean



userRouter.post("/register", async(req,res)=>{
    const{name,email,gender,password,age,city,is_married}=req.body
    try {
        bcrypt.hash(password,5, async(err, hash)=>{
        const user= new UserModel({name,email,gender,password:hash,age,city,is_married})
        await user.save()
        })
        res.status(200).send({"msg":"Registration Successful!!"})
    } catch (err) {
        res.status(400).send({"msg":"Registration Failed"})
    }
})

//******************************************************************************************* */

///users/login ==> For logging in generating a token


//bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await UserModel.findOne({email})
        if(user)
        {
            bcrypt.compare(password,user.password,(err,result)=>{
                res.status(200).send({"msg":"Login Successful!!", "token":jwt.sign({"userID":user._id},"masai")})
            })
        }
        else{
            res.status(400).send({"msg":"Login Failed"}) 
        }
        
    } catch (err) {
        res.status(400).send({"msg":"Login Failed"})
    }
})










module.exports={userRouter}