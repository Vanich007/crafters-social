const mongoose = require('mongoose')
const Schema = mongoose.Schema 
const projectsSchema = new Schema({
    user: {ref: 'users', type:Schema.Types.ObjectId},
    date: { type: Date, required: true, default: Date.now },
    projectBody: { type: String, defaulf: '' },
    projectTitle: { type: String, defaulf: '' },
    projectPosts:[{ref: 'posts', type:Schema.Types.ObjectId}],
    projectImageSrc: { type: String, defaulf: '' },
    likes: [
        {ref: 'users', type:Schema.Types.ObjectId}
    ]
})
module.exports=mongoose.model('projects',projectsSchema)