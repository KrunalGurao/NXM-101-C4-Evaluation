const express=require("express")
const {userRouter}=require("./route/user.route")
const {userModel}=require("./model/user.model")
const {connection}=require("./db")
const{noteModel}=require("./model/note.module")
const {noteRouter}=require("./route/note.route")
const {auth}=require("./middleware/auth")

require("dotenv").config()



const app=express()
app.use(express.json())


app.use("/users",userRouter)
app.use(auth)
app.use("/posts",noteRouter)


app.listen(process.env.port, async(req,res)=>{

    try {
        await connection
        console.log("SERVER CONNECTED TO DB 4100")
    } catch (err) {
        console.log("*************server not connected**************")
    }

})