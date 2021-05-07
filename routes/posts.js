const express = require('express')
const passport=require('passport')
const router = express.Router()
const upload=require('../middleware/upload')
const controller=require('../controllers/posts')

     
router.get('/:userId',  controller.getPostByUserId)  
//router.get('/', passport.authenticate('jwt',{session:false}), controller.getAllPosts)  
router.delete('/:id', passport.authenticate('jwt',{session:false}),controller.remove)  
router.post('/', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.create)  
router.patch('/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.update)  
router.patch('/like/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.likePostById)  
router.delete('/unlike/:id', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.unlikePostById)  
router.patch('/comments/like/:id', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.likeCommentById)  
router.patch('/comments/unlike/:id', passport.authenticate('jwt',{session:false}),upload.single('image'), controller.unlikeCommentById)  

router.post('/comments/', passport.authenticate('jwt', { session: false }), upload.single('image'), controller.createComment)  
router.get('/comments/:postId', controller.getCommentsByPostId)  
router.get('/tags/:tag', controller.getPostsByTag) 
 
module.exports=router