const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const postCommentsSchema = new Schema({
    user: { ref: 'users', type: Schema.Types.ObjectId },
    username: { type: String, defaulf: 'undef' },
    date: { type: Date, required: true, default: Date.now },
    postId: { ref: 'posts', type:Schema.Types.ObjectId },
    commentBody: { type: String, defaulf: '' },
    commentImageSrc: { type: String, defaulf: '' },
    likes: [
        {ref: 'users', type:Schema.Types.ObjectId}
    ]
})
module.exports=mongoose.model('postComments',postCommentsSchema)