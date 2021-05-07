const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const User = require('../models/User')
const Profile = require('../models/Profile')
const keys=require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const ObjectId = require('mongodb').ObjectId;

module.exports.fetchToken = async function (req, res) {
  const candidate = await User.findOne({ _id: req.user.id })
  if (candidate) {
    //проверка 
 
      res.status(200).json({user:candidate})
    } else {
res.status(401).json({message:'Не удалось войти в систему по token'})
    }
  
}

module.exports.login = async function (req, res) {
  console.log(req.body)  
  const candidate = await User.findOne({ email: req.body.email })
  if (candidate) {
    //проверка пароля
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    
    if (passwordResult) {
      //Генерация токена

      const token = jwt.sign({
        email: candidate.email,
        userId:candidate._id
      }, keys.jwt)  //,{expairesIn:36000}
      res.status(200).json({jwt:`bearer ${token}`,user:candidate})
    } else {
res.status(401).json({message:'Пароли не совпадают'})
    }
  } else {
    //пользователь не зарегистрирован
    res.status(404).json({
      message:'Пользователь с таким email не зарегистрирован'
    })
  }
}


module.exports.register=async function(req, res) {
  
  
  const candidate=await User.findOne({email:req.body.email})
  if (candidate) {
    //email есть в базе
 res.status(409).json({
      message:'Пользователь с таким email уже зарегистрирован'
  })} else {
    //создаем пользователя
     const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const hasProfile=false
   // console.log(`salt=${salt} pass=${password}`)
     const user = new User({
       email: req.body.email,
       username: req.body.username,
              password: bcrypt.hashSync(password,salt)
     })
   try{
     await user.save()
     await createProfile(user,res)
    //res.status(201).json(user)
     
     } catch(e) {
     //обработать ошибку
     errorHandler(res,e)
     }
  }
}

const createProfile = async function (user,res) {
  const candidate=await User.findOne({email:user.email})
  if (candidate) {
  const id = candidate._id
  let o_id = new ObjectId(id);
  console.log('id='+id)
 //
  try {
    const newprofile = new Profile({
      user: o_id,
      status: '',
      livingPlace: '',
      profileImageSrc: '',
      publicName: user.username
        
    })
    await newprofile.save()
    res.status(201).json(newprofile,user)
  } catch (e) {
    console.log(e)
  }}
}
