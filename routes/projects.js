const express = require('express')
const passport=require('passport')
const router = express.Router()
const upload=require('../middleware/upload')
const controller=require('../controllers/projects')

     
router.get('/user/', controller.getProjectsByUserId)  
router.get('/:id',  controller.getProjectsById)  
//router.get('/', passport.authenticate('jwt',{session:false}), controller.getAllPosts)  
router.delete('/:id', passport.authenticate('jwt',{session:false}),controller.remove)  
router.post('/', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.create)  
router.patch('/:id', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.update)  
router.patch('/like/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.likeProjectById)  
router.patch('/unlike/:id', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.unlikeProjectById)  

module.exports=router