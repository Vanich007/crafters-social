const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const tagSchema = new Schema({
 
    tagBody: { type: String, required: true }
    
})
module.exports=mongoose.model('tag',tagSchema)