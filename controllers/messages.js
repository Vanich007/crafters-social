const errorHandler = require("../utils/errorHandler")
const Message = require('../models/Messages')
const Dialogs = require('../models/Dialogs')
const ObjectId = require('mongodb').ObjectId;

//lastPost= await Post.findOne({user:req.user.id}).sort({date:-1})

module.exports.create = async function (req, res) {
    var newmessage=null
    const targetid = req.params.targetUserId
    try {
        newmessage =  new Message({
            user:req.user.id,
            targetUser:targetid,
        messageBody:req.body.messageBody,
        messageImageSrc:req.file?req.file.path:''
        
        })
            await newmessage.save()
        res.status(201).json(newmessage)
    } catch (e) {
        errorHandler(res,e)
    }
    //проверим, нужно ли создавать диалог
    let dialog=await getMyDialog(req.user.id,targetid)

    if(dialog) {dialogUpdate(dialog._id,newmessage)} 
    else {dialogCreate(newmessage)}
}


module.exports.getMessageById = async function (req, res) {
    const messageId = req.params.messageId
    const userId=req.user.id
    
    let o_id = new ObjectId(userId);
    let o_messageId = new ObjectId(messageId);
    try {        const message = await Message.findOne({    //req.params.id - id страницы со списком сообщений
        user: o_id,
        Id:o_messageId
        })
        res.status(200).json(message)
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.getMessagesByUserId = async function (req, res) {
    const targetId = req.query.userId
    const userId=req.user.id
    
    
    try {  let o_id = new ObjectId(userId);
    let target_id = new ObjectId(targetId);      
        const messages = await Message.find({    //req.params.id - id страницы со списком сообщений
            $or:[{user: o_id,targetUser:target_id},
        {user: target_id,targetUser:o_id}]
        }).sort({ date: -1 })
        .skip(+req.query.offset)
        .limit(+req.query.limit)
        res.status(200).json(messages)
        
        
    } catch (e) {
        errorHandler(res,e)
    }
}
//****************************api/posts?offset=2&limit=5&start=*************************
// module.exports.getAllPosts = async function (req, res) {
//     const query = { user: req.user.id }    //req.params.id - id страницы со списком сообщений
//         //Дата старта поиска
//     if (req.query.start) {
//             query.date = {
//             $gte:req.query.start            //больше или равно
//             }
        
//         }
//     if (req.query.end) {        //дата конца поиска
//             if(!query.date){query.date={}}
//             query.date[$lte] = req.query.end            //меньше или равно
            
//     }
//     if (req.query.order) {
//         query.order=+req.query.order            //номер заказа
//     }
    

//     try {
              
//         const posts = await Post
//         .find(query)
//         .sort({ date: -1 })
//         .skip(+req.query.offset)
//         .limit(+req.query.limit)
        
//         res.status(200).json(posts)
        
//     } catch (e) {
//         errorHandler(res,e)
//     }
// }

module.exports.remove = async function (req, res) {
    try {
        await Message.remove({ _id: req.params.id })
         res.status(200).json({deleted:req.params.id})
        
    } catch (e) {
        errorHandler(res,e)
    }
}

module.exports.update=async function(req, res) {
    try {
        const updated = { messageBody: req.body.messageBody }
        if (req.file) {
            updated.messageImageSrc=req.file.path
        }
        
        const updmessage = await Message.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated }, //изменяемый объект
            {new:true}  //сначала обновить запись, потом вернуть
        )
         res.status(200).json(updmessage)
    } catch (e) {
        errorHandler(res,e)
    }
}

// *************Dialogs*****************
let dialogCreate = async function (message) {
    let {user,targetUser,messageBody}=message
    //const targetid = req.params.targetUserId
    try {
        const newdialog =  new Dialogs({
            user,
            targetUser,
            lastMessage:message.messageBody,
        })
            await newdialog.save()

    } catch (e) {
        console.error(e)
    }
}
let dialogUpdate = async function (dialogId,message) {
    let {user,targetUser}=message
    const updated = {
        user,
        targetUser,
        lastMessage:message.messageBody,
        dialogDate:Date.now()
    }
   
    try {
        const updDialog = await Dialogs.findOneAndUpdate(
            {_id: dialogId},
            {$set: updated},
            {new: true}
          )
     
} catch (e) {
    console.error(e)
}
}
const getMyDialog = async function (userId,targetUserId) {
 
    let o_id = new ObjectId(userId);
    let target_id = new ObjectId(targetUserId);
    try {        const dialogs = await Dialogs.findOne({    //req.params.id - id страницы со списком сообщений
        $or:[{user:o_id, targetUser:target_id},
            {user:target_id,targetUser:o_id}]
        })
        return(dialogs)
        
    } catch (e) {
        console.error(e)
    }
}