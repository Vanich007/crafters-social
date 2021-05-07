const errorHandler = require("../utils/errorHandler")
const Project = require('../models/Projects')
const ObjectId = require('mongodb').ObjectId;

//lastPost= await Post.findOne({user:req.user.id}).sort({date:-1})

module.exports.create = async function (req, res) {
    console.log(`Create project user id=${req.user.id}, projectBody=${req.body.postBody}`)
    try {
        const newpost =  new Post({
            user:req.user.id,
            projectBody: req.body.projectBody,
            projectTitle: req.body.projectTitle,
        projectPosts:projectPosts,
        projectImageSrc:req.file?req.file.path:''
        
        })
            await newpost.save()
        res.status(201).json(newpost)
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.getProjectsByUserId = async function (req, res) {
    const id = req.params.userId
    if(id===undefined) return null
    let o_id = new ObjectId(id);
    try {        const posts = await Project.find({    //req.params.id - id страницы со списком сообщений
        user: o_id
        })
        res.status(200).json(posts)
        
        
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
        const updated = { postBody: req.body.postBody }
        if (req.file) {
            updated.postImageSrc=req.file.path
        }
        
        const updPost = await Post.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated }, //изменяемый объект
            {new:true}  //сначала обновить запись, потом вернуть
        )
         res.status(200).json(updPost)
    } catch (e) {
        errorHandler(res,e)
    }
}