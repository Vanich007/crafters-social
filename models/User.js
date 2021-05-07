const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    hasProfile: { type: Boolean },
    follow:[{ref: 'users', type:Schema.Types.ObjectId}]
})
module.exports=mongoose.model('user',userSchema)