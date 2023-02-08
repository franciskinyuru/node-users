const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
// CRUD
router.get('/', async function (req, res){
   try {
    const users= await userModel.find({})
    res.status(200).json({users})
   } catch (error) {
    res.status(400).json({message: error.message})
   }
})

router.post('/', async function (req, res){
    const data= new userModel({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname:req.body.lastname
    });
    try {
        const saveData= await data.save()
        res.status(200).json({saveData})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})
router.put('/:id', async function (req, res){
    try {
        const {id:userID} = req.params
        console.log(userID);
        console.log(req.body.firstname);
      userModel.updateOne(
            {_id:userID},{$set:{
                firstname:req.body.firstname
            }},{
                upsert:true
            },(err, user)=>{
                if (err) {
                    res.status(400).json({message: err})
                }
                else{
                    res.status(200).json({message:user})
                }
            })      
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', (req, res)=>{
    try {
        const {id:userID} = req.params
        userModel.deleteOne({_id:userID},(err, user)=>{
            if (err) {
                res.status(400).json({message: err})
            }
            else{
                res.status(200).json({message:user})
            }
        })

    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
module.exports = router