const express = require('express')
const passport=require('passport')
const router = express.Router()
const upload=require('../middleware/upload')
const controller=require('../controllers/profile')

router.get('/', controller.getProfileSearch)       
router.get('/:userId', controller.getProfileById)  
router.delete('/:id', passport.authenticate('jwt',{session:false}),controller.remove)  
router.post('/', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.create)  
router.patch('/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.update)  
router.patch('/follow/:userId', passport.authenticate('jwt', { session: false }), controller.follow)  
router.delete('/unfollow/:userId', passport.authenticate('jwt', { session: false }), controller.unfollow)
module.exports=router