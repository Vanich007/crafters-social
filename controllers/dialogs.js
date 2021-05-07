const errorHandler = require("../utils/errorHandler")
const Dialogs = require('../models/Dialogs')
const Profile = require('../models/Profile')
const ObjectId = require('mongodb').ObjectId;

module.exports.getAll = function (req, res) {
    //res.status(200).json({get:true})
}

module.exports.getMyDialogs = async function (req, res) {
    const id = req.user.id
    if(id==='undefined') return null
    //const targetid = req.params.targetUserId
    //console.log('Dialogs userId='+id);
    let o_id = new ObjectId(id);
    try {        const dialogs = await Dialogs.find({   //req.params.id - id страницы со списком сообщений
        $or:[{user:o_id},{targetUser:o_id}]
                
              //  targetUser:targetid
        })
        let readyDialogs=await Promise.all(dialogs.map(async function (item){        //соберем данные по юзерам
            let i={...item}
            let u_id
            if(item.targetUser!=id)
            {u_id = new ObjectId(item.targetUser)} else
            {u_id = new ObjectId(item.user)};
            console.log(item.targetUser,',',item.user,',',o_id)
              const profile = await Profile.findOne({    //req.params.id - id страницы со списком сообщений
                user:u_id})
                i.publicName=profile.publicName
                i.profileImageSrc=profile.profileImageSrc
                return i
    }))
    //console.log(readyDialogs)
        res.status(200).json(readyDialogs)
        
    } catch (e) {
        errorHandler(res,e)
    }
}

