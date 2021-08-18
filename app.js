const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const path=require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan=require('morgan')
const authRoutes = require('./routes/auth')
const dialogsRoutes = require('./routes/dialogs')
const postsRoutes = require('./routes/posts')
const profileRoutes = require('./routes/profile')
const photosRoutes = require('./routes/photos')
const messagesRoutes = require('./routes/messages')
const projectsRoutes = require('./routes/projects')
const tagsRoutes = require('./routes/tags')
const lentaRoutes = require('./routes/lenta')
const keys=require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI).then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
    require('./middleware/passport')(passport)
app.use(morgan('dev'))

// app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/api/auth', authRoutes) 
app.use('/api/dialogs', dialogsRoutes) 
app.use('/api/posts',postsRoutes) 
app.use('/api/profile',profileRoutes) 
app.use('/api/photo', photosRoutes) 
app.use('/api/messages',messagesRoutes) 
app.use('/api/projects',projectsRoutes) 
app.use('/api/tags',tagsRoutes) 
app.use('/api/lenta',lentaRoutes)
 if (process.env.NODE_ENV === 'production') {
     app.use(express.static('client/build'))
     app.get('*', (req, res) => {
         res.sendFile(
             path.resolve(
                 __dirname,'client','build','index.html'
            )
         )
     })
 }


module.exports=app