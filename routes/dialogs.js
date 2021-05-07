const express = require('express')
const router = express.Router()
const passport=require('passport')
const upload=require('../middleware/upload')
const controller=require('../controllers/dialogs')

//router.get('/getall',passport.authenticate('jwt',{session:false}),  controller.getAll)      
router.get('/', passport.authenticate('jwt',{session:false}), controller.getMyDialogs)  



module.exports=router