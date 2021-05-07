const errorHandler = require("../utils/errorHandler")
const Tag = require('../models/Tags')
const ObjectId = require('mongodb').ObjectId;

//lastPost= await Post.findOne({user:req.user.id}).sort({date:-1})

module.exports.create = async function (req, res) {
    console.log(`Create project user id=${req.user.id}, projectBody=${req.body.postBody}`)
    try {
        const newtag =  new Tag({
            tagBody: req.body.tagBody
        })
            await newtag.save()
        res.status(201).json(newpost)
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.getTagsBySubstring = async function (req, res) {
    const searchString = req.query.search
    if(id===undefined) return null
    let o_id = new ObjectId(id);
    try {        const tags = await Tag.find({tagBody: {$regex:searchString}})
        res.status(200).json(tags)
        
        
    } catch (e) {
        errorHandler(res,e)
    }
}
