const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const messagesSchema = new Schema({
    user: { ref: 'users', type: Schema.Types.ObjectId },
    targetUser: {ref: 'users', type:Schema.Types.ObjectId},
    date: { type: Date, required: true, default: Date.now },
    messageBody: { type: String, defaulf: '' },
    messageImageSrc: { type: String, defaulf: '' }
    
})
module.exports=mongoose.model('messages',messagesSchema)