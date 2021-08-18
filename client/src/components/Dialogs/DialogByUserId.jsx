import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { onSelectedUser } from '../../reducers/usersReducer'
import {getМessagesByUserId } from '../../utils/API/connectDialogs'
import {getProfileByUserId} from '../../utils/API/connectProfile'
import SendMessage from '../Content/SendMessage';
import s from './Dialogs.module.css'
import { userMessageSend } from '../../utils/API/connectDialogs'
import {getSelectedUserProfileByUserId} from '../../utils/API/connectSelectedProfile'


const DialogByUserIdMemo=({match,selectedUser,messages,profileImageSrc,publicName,onSelectedUser, getМessagesByUserId,getProfileByUserId,userMessageSend})=>{
  let messagesEnd = React.createRef()
  let [userId,setUserId]=useState(null)

 if (match.params.userId!==userId) setUserId(match.params.userId)

 useEffect(()=>{if(userId){
  getМessagesByUserId(userId)
  getProfileByUserId(userId)
  onSelectedUser(userId)
}},[userId])
useEffect(()=> {
  messagesEnd.scrollIntoView({ behavior: "smooth" });
  document.title = 'Диалог с пользователем '+publicName + ` на ${process.env.REACT_APP_SITE_TITLE}`
},[])
    
        let message=[]
     message = messages.map(item => {
       return (<li key={item._id}><MessageItem profileImageSrc={ profileImageSrc} _id={item._id} messageImageSrc={item.messageImageSrc}
         date={item.date} messageBody={item.messageBody}
         messageImageSrc={item.messageImageSrc} selectedUser={ selectedUser} user={ item.user}/></li>)
     })
    return <div className={s.dialogscroller}><div className={s.dialogwrapper}>
      
    { message }
    <SendMessage userMessageSend={userMessageSend} userId={selectedUser} />
    <div ref={(el) => { messagesEnd = el; }}>
        </div>
    </div></div>
}

const DialogByUserId = React.memo(DialogByUserIdMemo)

const MessageItem=(props)=>{
  const { messageImageSrc, profileImageSrc }=props
  let date=props.date.substr(0, 10)  
  // consolegit.log('selectedUser=',props.selectedUser,'user=',props.user)
  return <div className={props.selectedUser===props.user?s.messagecard:s.messagecard2}>

 
        
            <div className={s.user}> 
               <div className={s.avatarplace}>       
                  <img src={ (profileImageSrc?`${window.location.protocol}//${window.location.hostname}/${profileImageSrc}`:`${window.location.protocol}//${window.location.hostname}/images/guestavatar.gif`)} className={s.avatar}></img>
              </div> 
            </div>
    
            <div className={s.messagearea}>
                <div className={s.namemessage}>
                {/* <span className={s.username}>{props.targetUser}</span> */}
                <span className={s.message}>{props.messageBody}</span>
                </div>
                <span className={s.date}>{date}</span>
        </div>

      

  </div>
}

 const mapStateToProps = (state) => {
    return {
      selectedUser: state.usersPage.selectedUser,
      messages: state.dialogsPage.messages,
      profileImageSrc:state.profilePage.profileImageSrc,
      publicName: state.profilePage.publicName,
      selectedUser: state.usersPage.selectedUser
    }
  }
        

  
const DialogByUserIdContainer = connect(mapStateToProps, {
  onSelectedUser, getМessagesByUserId,getProfileByUserId,userMessageSend,getSelectedUserProfileByUserId})(DialogByUserId);




export default DialogByUserIdContainer;