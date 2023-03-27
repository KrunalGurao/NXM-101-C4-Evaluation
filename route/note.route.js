const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.module")


noteRouter.post("/add",async(req,res)=>{
    try {
        const note= new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"Post has been added"})
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})



//*********************************************************************************************** */

//// invalid token - synchronous
// try {
//     var decoded = jwt.verify(token, 'wrong-secret');
//   } catch(err) {
    // err


noteRouter.get("/",async(req,res)=>{
    const token=req.header.authorization
    const decoded=jwt.verify(token,"masai")
    try {
        if(decoded)
        {
            const note= await NoteModel.find({"userID":decoded.userID})
            res.send(note)
        }
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})


//******************************************************************************************************* */


noteRouter.patch("/update/:noteID",async(req,res)=>{
    const payload= req.body
    const noteID=req.params.noteID
    try {
        await NoteModel.findByIdAndUpdate({_id:noteID},payload)
        res.status(200).send({"msg":"Post has been updated"})
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})

//**************************************************************************************************** */


noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const payload= req.body
    const noteID=req.params.noteID
    try {
        await NoteModel.findByIdAndDelete({_id:noteID})
        res.status(200).send({"msg":"Post has been deleted"})
    } catch (err) {
        res.status(400).send({"msg":"ERROR OCCURED"})
    }
})


//************************************************************************************* */

noteRouter.get("/top",async(req,res)=>{
    let {page,q,sort}=req.query
     let value= sort=="asc"?1:-1
     let limit=3
     let skip= (+page -1)*limit
     let data= await NoteModel.find().sort({device:value}).skip(skip).limit(limit)
     res.status(200).send(data)
})












module.exports={noteRouter}