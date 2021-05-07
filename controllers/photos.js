const errorHandler = require("../utils/errorHandler")
const Photos = require('../models/Photos')
const ObjectId = require('mongodb').ObjectId;
//lastPost= await Post.findOne({user:req.user.id}).sort({date:-1})



module.exports.getProtoByUserId = async function (req, res) {
    
    const id = req.params.userId
    if(id===undefined) return null
   // console.log('profile userId='+id);
    let o_id = new ObjectId(id);
    try {        const photos = await Photos.find({    //req.params.id - id страницы со списком сообщений
                user:o_id
        })
        res.status(200).json(photos)
        
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.remove = async function (req, res) {
    try {
        await Photos.remove({ _id: req.params.id })
         res.status(200).json({message:'Фото удалено'})
        
    } catch (e) {
        errorHandler(res,e)
    }
}
module.exports.create = async function (req, res) {
     
    try {
        const newPhotos =  new Photos({
            user: req.user.id,
            photoImageSrc: req.file ? req.file.path : '',
            photoComment:req.body.photoComment
        
        })
        console.log('photo new=' + newPhotos.photoImageSrc + '-----' + newPhotos.photoComment);
            await newPhotos.save()
        res.status(201).json(newPhotos)
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.update=async function(req, res) {
    
    const updated = {
        photoComment: req.body.photoComment
    } 
        try {
            const updPhoto = await Photos.findOneAndUpdate(
                {_id: req.params.id},
                {$set: updated},
                {new: true}
              )
         res.status(200).json(updPhoto)
    } catch (e) {
        errorHandler(res,e)
    }
}