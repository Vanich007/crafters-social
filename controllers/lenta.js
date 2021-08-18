const errorHandler = require("../utils/errorHandler")
const Post = require('../models/Posts')
const Tag = require('../models/Tags')
const Profile=require('../models/Profile')
const Lenta = require('../models/Lenta')
const User = require('../models/User')
const ObjectId = require('mongodb').ObjectId;
//const lentaConrtoller=require('./lenta')

module.exports.createLenta = async function (user) {
    const candidate=await User.findOne({email:user.email})
    if (candidate) {
    const id = candidate._id
    let o_id = new ObjectId(id);
    try {
      const newLenta = new Lenta({
        user: o_id,
        interestTags:[],
        readedPosts:[]
      })
      await newLenta.save()
      
    } catch (e) {
      console.error(e)
    }}
  }
//lastPost= await Post.findOne({user:req.user.id}).sort({date:-1})
module.exports.getPosts = async function (req, res) {
    
    try {
        const user=req.user.id
    let  search = {  }
    //let user=''
        if(!user||user.length!==24) throw 'bad id'
    const o_id=new ObjectId(user)
    if (user&&user!=='undefined')
    {
        
        search.user=o_id
    } 
        const lenta = await Lenta.findOne(search)
        console.log('lenta',lenta)
        const readedPosts=lenta.readedPosts.map(item => item._id)
        const interestTags = lenta.interestTags
        console.log('interestTags',interestTags)
        //найдем непрочитанные посты по интересующим тегам
        let postSearch= { _id: { $nin: readedPosts },postTags:{$in:interestTags},user:{$ne:o_id} } 
        const posts = await Post.find(postSearch)
         .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        console.log('posts.length',posts.length)
        //найдем непрочитанные посты юзеров, на которых подписан            
        const profile = await Profile.findOne({    //req.params.id - id страницы со списком сообщений
                user:o_id
        })
const follow=profile.follow.filter(item=>!!item).map(item=>{
    return new ObjectId(item)
})
//console.log('follow',follow)
         postSearch= { _id: { $nin: readedPosts },user:{$in:follow} } 
         //console.log(postSearch)
        const Posts2 = await Post.find(postSearch)
         .sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        //console.log('posts2 length',Posts2.length)

        res.status(200).json([...Posts2,...posts])
       for (i of posts) { await createLentaReadedPosts(user, i._id) }
        
        
    } catch (e) {
        errorHandler(res,e)
    }
}




const createLentaReadedPosts = async function (user, post) {
    // console.log(user)
    // console.log(post)
    let o_id = new ObjectId(user)
    post_id=new ObjectId(post)
        const updated = {readedPosts:post_id}
        try {
            const updPost = await Lenta.updateOne(
                {user: o_id},
                { $push: updated }
                // ,  {new: true}
              )
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.createLentaInterestTags = async function (user,tags) {
    // console.log('createLentaInterestTags', user, tags)
  
        try {  if(!user||user.length!==24)throw 'bad id'
    let o_id = new ObjectId(user)
      const updated = {interestTags:tags}
            // const updProfile = await Profile.updateOne(
            //     {user: o_id},
            //     {$push: updated},
            //     {new: true}
            //   )
            const updPost = await Lenta.updateOne(
                {user: o_id},
                {$push: updated}
                // ,
                // { $upsert: true }          
                //  ,  {new: true}
              )
              console.log(updPost)
    } catch (e) {
        console.error(e)
    }
}

