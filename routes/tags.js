const express = require('express')
const router = express.Router()
const passport=require('passport')
const upload=require('../middleware/upload')
const controller=require('../controllers/tags')


router.get('/', passport.authenticate('jwt',{session:false}), controller.getTagsBySubstring)  
router.post('/',passport.authenticate('jwt',{session:false}),upload.single('image'),controller.create)  


module.exports=router