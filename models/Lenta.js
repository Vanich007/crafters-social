const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const lentaSchema = new Schema({
    user: {ref: 'users', type:Schema.Types.ObjectId},
     interestTags: [
        { type: String, defaulf: ''}
    ],
     
    readedPosts: [
        {ref: 'posts', type:Schema.Types.ObjectId}
    ]
})
module.exports=mongoose.model('lenta',lentaSchema)