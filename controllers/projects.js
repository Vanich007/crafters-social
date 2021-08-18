const errorHandler = require("../utils/errorHandler")
const Project = require('../models/Projects')
const ObjectId = require('mongodb').ObjectId;
const Tag = require('./tags')
const postsController=require('./posts')

//lastProject= await Project.findOne({user:req.user.id}).sort({date:-1})

module.exports.create = async function (req, res) {
    // (`Create project user id=${req.user.id}, projectBody=${req.body.projectBody}`)
    try {
        const newProject =  new Project({
            user:req.user.id,
            projectBody: req.body.projectBody,
            projectTitle: req.body.projectTitle,
        projectPosts:req.body.projectPosts.split('|'),
        projectTags:req.body.projectTags.split('|'),
        projectImageSrc:req.file?req.file.path:''
        
        })
            await newProject.save()
        res.status(201).json(newProject)
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.getProjectsByUserId = async function (req, res) {
   
    try { const id = req.query.userId
    if (!id||id.length!==24) throw 'bad id'
    let o_id = new ObjectId(id); 
           const projects = await Project.find({    //req.params.id - id страницы со списком сообщений
        user: o_id
    })
                 .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        
        console.log(projects)
        res.status(200).json(projects)
        
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.getProjectsById = async function (req, res) {
    

    try { const id = req.params.id
    if (id == 'undefined') throw 'bad id'
    if (!id||id.length!==24) throw 'bad id'
    let o_id = new ObjectId(id); 
          const projects = await Project.findOne({    //req.params.id - id страницы со списком сообщений
        _id: o_id
    })
        let projectPosts=[]
        for (let postId of projects.projectPosts) {
            let post=await postsController.returnPostById(postId)
            //console.log(post)
            projectPosts=[...projectPosts,post]
        }
        projects.projectPosts=projectPosts
        res.status(200).json([projects])
        
        
    } catch (e) {
        errorHandler(res,e)
    }
}

//****************************api/projects?offset=2&limit=5&start=*************************
module.exports.getAllProjects = async function (req, res) {
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
              
        const projects = await Project
        .find(query)
        .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        
        res.status(200).json(projects)
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await project.remove({ _id: req.params.id })
         res.status(200).json({deleted:req.params.id})
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.update=async function(req, res) {
    try {
        const updated = { projectTitle: req.body.projectTitle,
        }
        if (req.body.projectBody)updated.projectBody=req.body.projectBody 
        if (req.body.projectPosts)updated.projectPosts=req.body.projectPosts 
        if (req.body.projectTags)updated.projectTags=req.body.projectTags 
        

        if (req.file) {
            updated.projectImageSrc=req.file.path
        }
        
        const updProject = await Project.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated }, //изменяемый объект
            {new:true}  //сначала обновить запись, потом вернуть
        )
         res.status(200).json(updProject)
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.likeProjectById = async function (req, res) {
    
        try {const user= req.user.id
    const targetProject = req.params.id
    if (!targetProject||targetProject.length!==24) throw 'bad id'
    let o_id = new ObjectId(targetProject)
        const updated = {likes:user}
            const updProject = await Project.updateOne(
                {_id: o_id},
                { $push: updated }
                // ,  {new: true}
              )
              const projects = await Project.findOne(    //req.params.id - id страницы со списком сообщений
                {_id: o_id}
                )

let promicePosts= await Promise.all(projects.projectPosts.map
    (async function (item){ //соберем данные по юзерам
  const post=await postsController.returnPostById(item)           
return post}))
                projects.projectPosts=promicePosts
                res.status(200).json(projects)
                // for (let postId of projects.projectPosts) {
                //     let post=await postsController.returnPostById(postId)
                //     //console.log(post)
                //     projectPosts=[...projectPosts,post]
                // }

         
              
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.unlikeProjectById=async function(req, res) {
    const user= req.user.id
    const targetProject = req.params.id
    let o_id = new ObjectId(targetProject)
        const updated = {likes:user}
        try {
            const updProject = await Project.updateOne(
                {_id: o_id},
                { $pull: updated }
                // , {new: true}
              )
              const projects =await Project.findOne(    //req.params.id - id страницы со списком сообщений
                {_id: o_id}
                )
let promicePosts= await Promise.all(projects.projectPosts.map
    (async function (item){ //соберем данные по юзерам
  const post=await postsController.returnPostById(item)           
return post}))
                projects.projectPosts=promicePosts
                res.status(200).json(projects)
         
    } catch (e) {
        errorHandler(res,e)
    }
}