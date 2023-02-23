const Note=require('../models/noteModel')
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../errorHandling/catchAsyncError');
const errorHandler = require('../errorHandling/customErrorHandler');
const paginationFeature=require('../utils/paginationFeature')


const list=catchAsyncError(  async function(req ,res,){
    const {page}=req.query;
    paginationFeature({limit:6,page},Note,res)
})

const create=catchAsyncError( async function(req ,res){
    const {title,body,tagline}=req.body;
    const note=new Note({
        title,
        body,
        tagline
    })
   await note.save()
    res.status(201).json({
        success:true,
        data:note
    })

})
const read=catchAsyncError( function(req ,res){
   
    res.status(200).json({
        success: true,
        message: '',
        data: req.note
    })
})
const remove= catchAsyncError( async function(req ,res){
    const note=await Note.findByIdAndDelete(req.note._id)
    console.log(note);
    res.status(200).json({
        success:true,
        message:'deleted successfully'
    })

})


const update=catchAsyncError( async function(req ,res){
    const {title,body,tagline}=req.body;
    const {_id}=req.note
    const note=await Note.findByIdAndUpdate(_id,{  
        title,
        body,
        tagline
    },{new:true,runValidators:true})


    res.status(200).json({
         success:true,
        message:'updated successfully',
        data:note
    })

})

const noteById=catchAsyncError( async function(req ,res,next){
    const {noteId}=req.params
    const note=await Note.findById(noteId)
    if(!note){
        return next(new errorHandler('notes not found',404))
    }
    req.note=note;
    next()

})
 

module.exports={list,read,update,create,remove,noteById}
