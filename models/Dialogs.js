const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const dialogsSchema = new Schema({
    user: {ref: 'users', type:Schema.Types.ObjectId},
    targetUser: {ref: 'users', type:Schema.Types.ObjectId},
    dialogDate: { type:Date, default:Date.now},
    lastMessage:{ type: String, defaulf: ''}
})
module.exports=mongoose.model('dialogs',dialogsSchema)