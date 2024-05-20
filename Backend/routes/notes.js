const express = require('express')
const router = express.Router();
const { query,body ,validationResult } = require('express-validator');
const Note = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')


router.post('/addnote',fetchuser,body('title').isLength({min:5}),body('description').exists().isLength({min:10}),body('tag').isLength({min:3}),async (req,res)=>{

let data = {userid:req.user.id,title:req.body.title,description:req.body.description,tag:req.body.tag}

// console.log(typeof(req.user.id))
let note = await Note.create(data)
return res.status(200).json({note})

   
}).get('/fetchallnotes',fetchuser,async(req,res)=>{
    try{

        // console.log("userid ",req.user.id)
        const notes = await Note.find({userid:req.user.id})

        // console.log("notes",notes);
        res.status(200).json(notes)


    }catch(error){

    }
}).post('/updatenote/:id',fetchuser,body('title').isLength({min:5}),body('description').exists().isLength({min:10}),body('tag').isLength({min:3}),async(req,res)=>{
    try{

        const{title,description,tag} = req.body
        const note = await Note.findById(req.params.id)
        if(!note){
            return res.status(400).json({error:"note doesent exist"})
        }
        else{
            if(note.userid!==req.user.id){
                return res.status(400).json({error:"unauthorized action"})
            }

            const data =await Note.findByIdAndUpdate(req.params.id,{title,description,tag})
            // const data =await Note.findByIdAndUpdate(req.params.id,{$set:{title,description,tag}},{new:true})

            // The first line replaces the entire document with the new values provided in the object.
            // The second line updates specific fields (title, description, tag) without replacing the entire document, using the $set operator.

            return res.status(200).json(data)
    

        }
    }catch(error){

    }
}).delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
        // console.log(typeof(req.params.id))
        // const note = await Note.findById({id:req.params.id})
        // cant use this syntax because we are using findById(id) and it recieves only a string id
    
        
        const note = await Note.findById(req.params.id)


        // console.log(note)
        if(!note){
            return res.status(400).json({error:"note doesent exist"})
        }
        else{
            if(note.userid!==req.user.id){
                return res.status(400).json({error:"unauthorized action"})
            }

            const data =await Note.findByIdAndDelete(req.params.id)
            return res.status(200).json(data)
    

        }
    }catch(error){

    }
})

module.exports = router

