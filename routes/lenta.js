const express = require('express')
const passport=require('passport')
const router = express.Router()
const upload=require('../middleware/upload')
const controller=require('../controllers/lenta')

router.get('/', passport.authenticate('jwt',{session:false}), upload.single('image'), controller.getPosts)    


 
module.exports=router