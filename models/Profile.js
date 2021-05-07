const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const profileSchema = new Schema({
    user: {ref: 'users', type:Schema.Types.ObjectId},
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, defaulf: '' },
    livingPlace:{ type: String, defaulf: '' },
    profileImageSrc: { type: String, defaulf: '' },
    profileMiniImageSrc: { type: String, defaulf: '' },
    publicName: { type: String, defaulf: '' },
    follow: [
        {ref: 'users', type:Schema.Types.ObjectId}
    ]
})
module.exports=mongoose.model('profile',profileSchema)