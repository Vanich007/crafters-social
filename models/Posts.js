const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const postsSchema = new Schema({
    user: {ref: 'users', type:Schema.Types.ObjectId},
    date: { type: Date, required: true, default: Date.now },
    postBody: { type: String, defaulf: '' },
    postTitle: { type: String, defaulf: '' },
    postTags:[{type: String, defaulf: ''}],
    postImageSrc: { type: String, defaulf: '' },
    likes: [
        {ref: 'users', type:Schema.Types.ObjectId}
    ]
     
})
module.exports=mongoose.model('posts',postsSchema)