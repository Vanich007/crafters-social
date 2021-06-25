const express = require('express')
const passport=require('passport')
const router = express.Router()
const upload=require('../middleware/upload')
const controller=require('../controllers/posts')

router.get('/search/',  controller.getPostsBySubstring)    
router.get('/comments/', controller.getCommentsByPostId)  
router.get('/tags/', controller.getPostsByTag)  
router.get('/', controller.getPostByUserId) 
router.get('/id/:id', controller.getPostById)   
//router.get('/', passport.authenticate('jwt',{session:false}), controller.getAllPosts)  
router.delete('/:id', passport.authenticate('jwt',{session:false}),controller.remove)  
router.delete('/comments/:id', passport.authenticate('jwt', { session: false }), controller.clearCommentById)  
router.post('/', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.create)  
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.update)  
router.patch('/like/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.likePostById)  
router.patch('/unlike/:id', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.unlikePostById)  
router.patch('/comments/like/:id', passport.authenticate('jwt', { session: false }), controller.likeCommentById)  
router.patch('/comments/unlike/:id', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.unlikeCommentById)  

router.post('/comments/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.createComment)  

 
module.exports=router