const errorHandler = require("../utils/errorHandler")
const Profile = require('../models/Profile')
const ObjectId = require('mongodb').ObjectId;
//lastPost= await Post.findOne({user:req.user.id}).sort({date:-1})




module.exports.getProfileSearch = async function (req, res) {
   
    let searchString = ''
    if (req.query.search!=='undefined')
    {searchString = new RegExp(req.query.search.toLowerCase(), "i")
    }
   
    //let o_id = new ObjectId(id);
    try {        const profiles = await Profile.find({publicName: {$regex:searchString}})
        res.status(200).json(profiles)
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.getProfileById = async function (req, res) {
    const id = req.params.userId
    let o_id = new ObjectId(id);
    if (id!=='undefined')
    try {        const profile = await Profile.findOne({    //req.params.id - id страницы со списком сообщений
                user:o_id
        })
        res.status(200).json(profile)
        
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.returnProfileById=async function (id){
    let o_id = new ObjectId(id);
    if (id!=='undefined')
    try {        const profile = await Profile.findOne({user:o_id})
    return profile         
}catch (e) {
    console.error(e)
}

}

module.exports.remove = async function (req, res) {
    try {
        await Post.remove({ _id: req.params.id })
         res.status(200).json({deleted:req.params.id})
        
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.create = async function (req, res) {
    
    try {
        const newprofile =  new Profile({
            user: req.user.id,
            status: req.body.status,
            livingPlace:req.body.livingPlace,
            profileImageSrc: req.file ? req.file.path : '',
            publicName:req.body.publicName
        
        })
            await newprofile.save()
        res.status(201).json(newprofile)
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.update=async function(req, res) {
    let updated={}
        // const updated = {
        //     livingPlace: req.body.livingPlace,
        //     status: req.body.status,
        //     publicName: req.body.publicName,
        // }
        
        if (req.body.livingPlace) {
            updated.livingPlace= req.body.livingPlace
        }
        if (req.body.status) {
            updated.status= req.body.status
        }
        if (req.body.publicName) {
            updated.publicName= req.body.publicName
        }
        if (req.file) {
            updated.profileImageSrc=req.file.path
        }
        //const id = req.params.id
    //let o_id = new ObjectId(id);
        
        try {
            const updProfile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: updated},
                {new: true}
              )
console.log(updProfile)

         res.status(200).json(updProfile)
    } catch (e) {
        errorHandler(res,e)
    }
}




module.exports.follow=async function(req, res) {
    const targetuser = req.params.userId
    let o_id = new ObjectId(req.user.id)
        const updated = {follow:req.params.userId}
        console.log(o_id,'-',req.params.userId)
        try {
            const updProfile = await Profile.updateOne(
                {user: o_id},
                {$push: updated},
                {new: true}
              )
              const newProfile=await Profile.findOne({
                  user:o_id
              })
              console.log(newProfile)
         res.status(200).json(newProfile)
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.unfollow=async function(req, res) {
    const targetuser = req.params.userId
    let o_id = new ObjectId(req.user.id)
        const updated = {follow:req.params.userId}
        try {
            const updProfile = await Profile.updateOne(
                {user:o_id },
                {$pull: updated},
                {new: true}
              )
          const newProfile=await Profile.findOne({
                  user:o_id
              })
              console.log(newProfile)
         res.status(200).json(newProfile)
    } catch (e) {
        errorHandler(res,e)
    }
}