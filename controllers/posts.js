const errorHandler = require("../utils/errorHandler")
const Post = require('../models/Posts')
const Tag=require('../models/Tags')
const Profile=require('../models/Profile')
const PostComment = require('../models/PostComments')
const ObjectId = require('mongodb').ObjectId;
const tagConrtoller=require('./tags')
const lentaController=require('./lenta')
const profileController = require('./profile')

module.exports.createComment = async function (req, res) {
    try {
        const newcomment =  new PostComment({
            user:req.user.id,
            commentBody: req.body.commentBody,
            username: req.body.username,
            postId:req.body.postId,
            commentImageSrc:req.file?req.file.path:''
        
        })
            await newcomment.save()
        res.status(201).json(newcomment)
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.getPostsBySubstring = async function (req, res) {
    let searchString = '',search={}
    if (req.query.substring!='undefined')
    { searchString = new RegExp(req.query.substring.toLowerCase(), "i")
    //`${req.query.substring}` 
} else 
 errorHandler(res,'bad substring')
    
    if (searchString)  search = { postTitle: { $regex: searchString } }
    let user=''
    if (req.query.user&&req.query.user.length===24)
    {
        const o_id = new ObjectId(req.query.user)
        search.user=o_id
    } 

    try {
        const Posts = await Post.find(search)
        .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)

        let newPosts=[]//Posts.map(post => insertProfilesToPost(post))

        // for (let post of Posts) {
        //    let publicName=await insertProfilesToPost(post)
        //    post._doc.publicName=publicName
        //    newPosts=[...newPosts,post._doc]
        // }

let promicePosts= await Promise.all(Posts.map
    (async function (item){ //соберем данные по юзерам
    
    let i={...item}
  const publicName=await insertProfilesToPost(item)
           item._doc.publicName=publicName
           newPosts=[...newPosts,item._doc]
return item


    }))
   
    newPosts=promicePosts.map(item=>item._doc)

        res.status(200).json(newPosts)
        } catch (e) {
        errorHandler(res,e)
        }
       }

       async function insertProfilesToPost(post) {
      
        let profile=await profileController.returnProfileById(post.user)
console.log('profile',profile)
        return (profile.publicName? profile.publicName:'')
       
       }
       
        


module.exports.getCommentsByPostId = async function (req, res) {
     const id = req.query.postId
     
    
    // if (req.query.start) {query.date = {$gte:req.query.start}}
    // if (req.query.end) { //дата конца поиска
    // if(!query.date){query.date={}}
    // query.date[$lte] = req.query.end}

    
    try {
        
    if (!id || id.length !== 24) throw 'bad id'
        let o_id = new ObjectId(id);
    let query = { postId: o_id }
        const comments = await PostComment.find(query)
        // .sort({ date: -1 })
        // .skip(+req.query.offset)
        // .limit(+req.query.limit)

    let readyComments=[]
    let promiceComments= await Promise.all(comments.map
    (async function (item){ //соберем данные по юзерам
    
    let i={...item}
    let u_id = new ObjectId(item.user);
    const profile = await Profile.findOne({ //req.params.id - id страницы со списком сообщений
    user:u_id})
    i._doc.publicName=profile.publicName
    i._doc.profileImageSrc=profile.profileImageSrc
    return i
    }))
   
    readyComments=promiceComments.map(item=>item._doc)
    
    res.status(200).json(readyComments)
   
    } catch (e) {
    errorHandler(res,e)
    }
   
   }
   
   

   


module.exports.create = async function (req, res) {
    try {
        //console.log('post file=',req.file)
        const newpost =  new Post({
            user:req.user.id,
            postBody: req.body.postBody,
        postTitle:req.body.postTitle,
        postImageSrc:req.file?req.file.path:'',
        postTags:req.body.postTags.split('|')
        })
        await newpost.save()
        
        await lentaController.createLentaInterestTags(req.user.id,req.body.postTags.split('|'))
        await tagConrtoller.saveTagsToDb(req.body.postTags.split('|'))
        
        res.status(201).json(newpost)
    } catch (e) {
        errorHandler(res,e)
    }
}




module.exports.getPostByUserId = async function (req, res) {    
    try { 
        const id = req.query.userId
    if (!id || id.length !== 24) throw 'getPostByUserId bad id'
let o_id = new ObjectId(id);
    let query = { user: o_id }
    if (req.query.start) {
    query.date = {
    $gte:req.query.start //больше или равно
    }
    }
    if (req.query.end) { //дата конца поиска
    if(!query.date){query.date={}}
    query.date[$lte] = req.query.end //меньше или равно
    }

        const posts = await Post.find(query)
        .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)
   

        let newPosts=[]//Posts.map(post => insertProfilesToPost(post))
console.log('posts mass',posts)
   let promicePosts= await Promise.all(posts.map
    (async function (item){ //соберем данные по юзерам
    
    let i={...item}
  const publicName=await insertProfilesToPost(item)
console.log('item',item)
           item._doc.publicName=publicName
           newPosts=[...newPosts,item._doc]
return item


    }))
   
    newPosts=promicePosts.map(item=>item._doc)
        res.status(200).json(newPosts)
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.getPostById = async function (req, res) {
    const id = req.params.id
    
    
    try {     if (!id||id.length!==24) throw 'getPostById bad id - '+id
    let o_id = new ObjectId(id);   
    const posts = await Post.find({    //req.params.id - id страницы со списком сообщений
        _id: o_id
        })
        
        let newPosts=[]//Posts.map(post => insertProfilesToPost(post))

       let promicePosts= await Promise.all(posts.map
    (async function (item){ //соберем данные по юзерам
    
    let i={...item}
  const publicName=await insertProfilesToPost(item)
           item._doc.publicName=publicName
           newPosts=[...newPosts,item._doc]
return item
    }))
   
    newPosts=promicePosts.map(item=>item._doc)
        res.status(200).json(newPosts)
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.getPostsByTag = async function (req, res) {
    const tag = req.query.tag
  
    
    try {
          if(id===undefined) throw 'tag undefined'
        
        const posts = await Post.find({    //req.params.id - id страницы со списком сообщений
        postTags: tag
        }) 
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        let newPosts=[]//Posts.map(post => insertProfilesToPost(post))

   let promicePosts= await Promise.all(posts.map
    (async function (item){ //соберем данные по юзерам
    
    let i={...item}
  const publicName=await insertProfilesToPost(item)
           item._doc.publicName=publicName
           newPosts=[...newPosts,item._doc]
return item


    }))
   
    newPosts=promicePosts.map(item=>item._doc)
        res.status(200).json(newPosts)
        
    } catch (e) {
        errorHandler(res,e)
    }
}
//****************************api/posts?offset=2&limit=5&start=*************************
module.exports.getAllPosts = async function (req, res) {
    const query = { user: req.user.id }    //req.params.id - id страницы со списком сообщений
        //Дата старта поиска
    if (req.query.start) {
            query.date = {
            $gte:req.query.start            //больше или равно
            }
        
        }
    if (req.query.end) {        //дата конца поиска
            if(!query.date){query.date={}}
            query.date[$lte] = req.query.end            //меньше или равно
            
    }
    if (req.query.order) {
        query.order=+req.query.order            //номер заказа
    }
    

    try {
              
        const posts = await Post
        .find(query)
        .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        
        res.status(200).json(posts)
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.remove = async function (req, res) {
    
    try {let id=req.params.id
    if (!id || id.length !== 24) throw 'bad id'
    let o_id = new ObjectId(id)
        await Post.remove({ _id: o_id })
         res.status(200).json({deleted:req.params.id})
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.update=async function(req, res) {
    try {
        const updated = {
            postBody: req.body.postBody,
            postTitle: req.body.postTitle,
            
            }
            if(req.body.postTags)
            updated.postTags= req.body.postTags.split('|')

        tagConrtoller.saveTagsToDb(updated.postTags)
        if (req.file) {
            updated.postImageSrc=req.file.path
        }
        const targetPost = req.params.id
        if (!targetPost||targetPost.length!==24) throw 'bad id'
        let o_id = new ObjectId(targetPost)
        let updPost = await Post.findOneAndUpdate(
            { _id: o_id },
            { $set: updated }, //изменяемый объект
            {new:true}  //сначала обновить запись, потом вернуть
        )
        
          let publicName=await insertProfilesToPost(updPost)
          updPost._doc.publicName=publicName
        res.status(200).json(updPost._doc)

         
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.likePostById = async function (req, res) {
    try { const user= req.user.id
    const targetPost = req.params.id
    if (!targetPost||targetPost.length!==24) throw 'bad id'
    let o_id = new ObjectId(targetPost)
        const updated = {likes:user}
            const updPost = await Post.updateOne(
                {_id: o_id},
                { $push: updated }
                // ,  {new: true}
              )
              let posts = await Post.findOne(    //req.params.id - id страницы со списком сообщений
                {_id: o_id}
                )
            
                posts._doc.publicName=await insertProfilesToPost(posts)
              res.status(200).json(posts._doc)
         
              
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.unlikePostById=async function(req, res) {
    
        try {const user= req.user.id
    const targetPost = req.params.id
    if (!targetPost||targetPost.length!==24) throw 'bad id'
    let o_id = new ObjectId(targetPost)
        const updated = {likes:user}
            const updPost = await Post.updateOne(
                {_id: o_id},
                { $pull: updated }
                // , {new: true}
              )
              let posts = await Post.findOne(    //req.params.id - id страницы со списком сообщений
                {_id: o_id}
                )
                posts._doc.publicName=await insertProfilesToPost(posts)
              res.status(200).json(posts._doc)
         
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.likeCommentById = async function (req, res) {
   
        try { const user= req.user.id
    const id = req.params.id
    if (!id||id.length!==24) throw 'bad id'
    let o_id = new ObjectId(id)
        const updated = {likes:user}
            let updComment1 = await PostComment.updateOne(
                {_id: o_id},
                { $push: updated }
              )
              const updComment = await PostComment.findOne(    //req.params.id - id страницы со списком сообщений
                {_id: o_id}
                )
                
         res.status(200).json(updComment)
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.unlikeCommentById=async function(req, res) {
   
        try { const user=req.user.id
    const targetComment = req.params.id
    if (!targetComment||targetComment.length!==24) throw 'bad id'
    let o_id = new ObjectId(targetComment)
    
        const updated = {likes:user}
            const updComment1 = await PostComment.updateOne(
                {_id: o_id},
                { $pull: updated }
              )
              const updComment = await PostComment.findOne(    //req.params.id - id страницы со списком сообщений
                {_id: o_id}
                )
         res.status(200).json(updComment)
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.clearCommentById=async function(req, res) {

        try {    const user=req.user.id
    const targetComment = req.params.id
    if (!targetComment||targetComment.length!==24) throw 'bad id'
    let o_id = new ObjectId(targetComment)
        const updated = {commentImageSrc:'',commentBody:'Комментарий удален'}
            const updComment = await PostComment.findOneAndUpdate(
                {_id: o_id},
                {$set: updated},
                {new: true}
              )
         res.status(200).json(updComment)
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.returnPostById = async function (id) {
   
        try {  if (!id||id.length!==24) throw 'bad id'
        let o_id = new ObjectId(id);
    let post   
         post = await Post.findOne({    //req.params.id - id страницы со списком сообщений
        _id: o_id
        })
        
        let publicName=await insertProfilesToPost(post)
        post._doc.publicName=publicName
      res.status(200).json(post._doc)
    } catch (e) {
        errorHandler(res,e)
    }
}