const errorHandler = require("../utils/errorHandler")
const Post = require('../models/Posts')
const PostComment = require('../models/PostComments')
const ObjectId = require('mongodb').ObjectId;

//lastPost= await Post.findOne({user:req.user.id}).sort({date:-1})

module.exports.createComment = async function (req, res) {
    console.log(`Create post comment user id=${req.user.id}, commentBody=${req.body.commentBody}`)
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
module.exports.getCommentsByPostId = async function (req, res) {
    const id = req.params.postId
    if(id===undefined) return null
    let o_id = new ObjectId(id);
    try {        const comments = await PostComment.find({    //req.params.id - id страницы со списком сообщений
        PostId: o_id
    })
        
        let readyComments=await Promise.all(comments.map(async function (item){        //соберем данные по юзерам
            let i={...item}
            let o_id = new ObjectId(item.user);
              const profile = await Profile.findOne({    //req.params.id - id страницы со списком сообщений
                user:o_id})
                i.publicName=profile.publicName
                i.profileImageSrc=profile.profileImageSrc
                return i
    }))
        res.status(200).json(readyComments)
        console.log('comments postId='+id+' rez= '+comments.length);
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.create = async function (req, res) {
    console.log(`Create post user id=${req.user.id}, postBody=${req.body.postTags}`)
    try {
        const newpost =  new Post({
            user:req.user.id,
            postBody: req.body.postBody,
        postTitle:req.body.postTitle,
        postImageSrc:req.file?req.file.path:'',
        postTags:req.body.postTags.split('|')
        })
            await newpost.save()
        res.status(201).json(newpost)
    } catch (e) {
        errorHandler(res,e)
    }
}




module.exports.getPostByUserId = async function (req, res) {
    const id = req.params.userId
    if(id===undefined) return null
    let o_id = new ObjectId(id);
    try {        const posts = await Post.find({    //req.params.id - id страницы со списком сообщений
        user: o_id
        })
        res.status(200).json(posts)
        console.log('Post userId='+id+' rez= '+posts.length);
        
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.getPostsByTag = async function (req, res) {
    const tag = req.params.tag
    if(id===undefined) return null
    
    try {const posts = await Post.find({    //req.params.id - id страницы со списком сообщений
        postTags: tag
        })
        res.status(200).json(posts)
        console.log('Post userId='+id+' rez= '+posts.length);
        
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
    try {
        await Post.remove({ _id: req.params.id })
         res.status(200).json({message:'Пост удален'})
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.update=async function(req, res) {
    try {
        const updated = {
            postBody: req.body.postBody,
            postTitle: req.body.postTitle,
            postTags:req.body.postTags.split('|')
        }
        if (req.file) {
            updated.postImageSrc=req.file.path
        }
        const targetPost =req.params.id
        let o_id = new ObjectId(targetPost)
        const updPost = await Post.findOneAndUpdate(
            { _id: o_id },
            { $set: updated }, //изменяемый объект
            {new:true}  //сначала обновить запись, потом вернуть
        )
         res.status(200).json(updPost)
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.likePostById = async function (req, res) {
    const user= req.user.id
    const targetPost = req.params.id
    let o_id = new ObjectId(targetPost)
        const updated = {likes:user}
        try {
            const updPost = await Post.updateOne(
                {_id: o_id},
                { $push: updated }
                // ,  {new: true}
              )
              const posts = await Post.findOne(    //req.params.id - id страницы со списком сообщений
                {_id: o_id}
                )
                res.status(200).json(posts)
         
              
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.unlikePostById=async function(req, res) {
    const user= req.user.id
    const targetPost = req.params.id
    let o_id = new ObjectId(targetPost)
        const updated = {likes:user}
        try {
            const updPost = await Post.updateOne(
                {_id: o_id},
                { $pull: updated }
                // , {new: true}
              )
              const posts = await Post.findOne(    //req.params.id - id страницы со списком сообщений
                {_id: o_id}
                )
                res.status(200).json(posts)
         
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.likeCommentById = async function (req, res) {
    const user= req.user.id
    const targetComment = req.params.id
    let o_id = new ObjectId(targetComment)
        const updated = {likes:user}
        try {
            const updComment = await PostComments.updateOne(
                {_id: o_id},
                { $push: updated }
                // ,  {new: true}
              )
         res.status(200).json(updComment)
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.unlikeCommentById=async function(req, res) {
    const user=req.user.id
    const targetComment = req.params.id
    let o_id = new ObjectId(targetComment)
        const updated = {likes:user}
        try {
            const updComment = await PostComments.updateOne(
                {_id: o_id},
                { $pull: updated }
                // , {new: true}
              )
         res.status(200).json(updComment)
    } catch (e) {
        errorHandler(res,e)
    }
}