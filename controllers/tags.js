const errorHandler = require("../utils/errorHandler")
const Tag = require('../models/Tags')
const ObjectId = require('mongodb').ObjectId;

//lastPost= await Post.findOne({user:req.user.id}).sort({date:-1})

module.exports.create = async function (req, res) {
    
    try {
        const newtag =  new Tag({
            tagBody: req.body.tagBody
        })
            await newtag.save()
        res.status(201).json(newtag)
    } catch (e) {
        errorHandler(res,e)
    }
}


module.exports.getTagsBySubstring = async function (req, res) {
    const searchString = req.query.search
    try {
        const tags = await Tag.find({ tagBody: { $regex: searchString } })
         //.sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)    

        res.status(200).json(tags)
        } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.saveTagsToDb = async (tags) =>  {
    // tags.forEach((item) => {
    //     const tag = await Tag.find({ tagBody: { $regex: item.tagBody } })
        for (let item of tags)
        { 
            const search_result = Tag.findOne({tagBody:item})
    if (!search_result)
    {
        const newtag = new Tag({ tagBody: item })
        await newtag.save()
        //Tag.insert()
    }   
    }
    
}