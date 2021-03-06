const express = require('express')
const passport=require('passport')
const router = express.Router()
const upload=require('../middleware/upload')
const controller=require('../controllers/photos')

     
router.get('/', controller.getProtoByUserId)  
router.delete('/:id', passport.authenticate('jwt',{session:false}),controller.remove)  
router.post('/', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.create)  
router.patch('/:id', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.update)  

module.exports=router