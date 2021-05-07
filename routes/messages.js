const express = require('express')
const router = express.Router()
const passport=require('passport')
const upload=require('../middleware/upload')
const controller=require('../controllers/messages')


router.get('/:userId', passport.authenticate('jwt',{session:false}), controller.getMessagesByUserId)  
//router.get('/:messageid', passport.authenticate('jwt',{session:false}), controller.getMessageById)  
// router.delete('/:id', passport.authenticate('jwt',{session:false}),controller.remove)  
 router.post('/:targetUserId',passport.authenticate('jwt',{session:false}),upload.single('image'),controller.create)  
// router.patch('/:id',passport.authenticate('jwt',{session:false}),upload.single('image'),  controller.update)  

module.exports=router