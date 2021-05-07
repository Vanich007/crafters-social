const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const photosSchema = new Schema({
    user: {ref: 'users', type:Schema.Types.ObjectId},
    date: { type: Date, required: true, default: Date.now },
    photoComment: { type: String, defaulf: '' },
    photoImageSrc: { type: String, defaulf: '' },
    likes: [
        {ref: 'users', type:Schema.Types.ObjectId}
    ]
})
module.exports=mongoose.model('photos',photosSchema)