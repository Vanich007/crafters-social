const errorHandler = require("../utils/errorHandler")
const Profile = require('../models/Profile')
const ObjectId = require('mongodb').ObjectId;


module.exports.getProfileSearch = async function (req, res) {
    try {   let searchString = ''
    if (req.query.search!=='undefined')
    {searchString = new RegExp(req.query.search.toLowerCase(), "i")
    }   
        const profiles = await Profile.find({publicName: {$regex:searchString}})
        res.status(200).json(profiles)
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.getProfileById = async function (req, res) {
  
    try {   const id = req.params.userId
console.log('id length',id.length)
console.log('prof id=',id)
    if (!id||id.length!==24) throw 'profile bad id'
    let o_id = new ObjectId(id);
           const profile = await Profile.findOne({    //req.params.id - id страницы со списком сообщений
                user:o_id
        })
        res.status(200).json(profile)
        
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.returnProfileById=async function (id1){
const id=String(id1)
    try {  if (!id||id.length!==24) throw 'returnProfileById bad id'
    let o_id = new ObjectId(id);
    
          const profile = await Profile.findOne({user:o_id})

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

         res.status(200).json(updProfile)
    } catch (e) {
        errorHandler(res,e)
    }
}




module.exports.follow=async function(req, res) {

        try {    const targetuser = req.params.userId
    let o_id = new ObjectId(req.user.id)
        const updated = {follow:req.params.userId}
        
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

    try { const targetuser = req.params.userId
    if (!targetuser || targetuser.length !== 24) throw 'bad targetuser'
    let o_id = new ObjectId(req.user.id)
    const updated = {follow:o_id}
    const updProfile = await Profile.updateOne(
            {user:o_id },
            {$pull: updated},
            {multi: true}
    )
    const newProfile=await Profile.findOne({
    user:o_id
    })
    // console.log(newProfile)
    res.status(200).json(newProfile)
    } catch (e) {
    errorHandler(res,e)
    }
   
   }