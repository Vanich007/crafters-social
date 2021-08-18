import React, {useState,useEffect} from 'react';
import s from './ShowProfile.module.css'
import SendMessage from './SendMessage';
import Modal from '../common/Modal'
import {Redirect} from 'react-router-dom'



export default function ProfileAnketa({ selectedUserProfile, ...props }) {
  
  useEffect(()=>{props.getSelectedUserProfileByUserId(props.selectedUser)},[props.selectedUser])
  let [modalActive,setModalActive]=useState(true)
  let [sendMessageState, setSendMessage] = useState(false)
  let [followState, ToggleFollow] = useState(false)   //есть ли связь follow
  const setToggleFollow = () => {
    if (followState) { ToggleFollow(false); props.unfollow(props.selectedUser) }
    
  else {ToggleFollow(true); props.follow(props.selectedUser)}
  }

  const profileImageSrc = selectedUserProfile.profileImageSrc
  
  return (<div className={s.anketablock}>
          <div className={s.avatarplace}>       
      <img src={(profileImageSrc?profileImageSrc:'/uploads/images/guestavatar.gif')} className={s.avatar}></img>
    
    </div> 
   
    <div className={s.profcol}>
     <div className={s.line} >
      <label>Статус </label><b>{selectedUserProfile.status}</b></div>
      <div className={s.line} ><label>Место жительства </label><b>{selectedUserProfile.livingPlace}</b></div>
      <div className={s.line} ><label>Имя пользователя </label><b>{selectedUserProfile.publicName}</b></div>
      {sendMessageState ? (<Redirect to ={'/dialogs/'+props.selectedUser}/>
     
      ) : (
        <button onClick={()=>{setSendMessage(true)}}>Отправить сообщение</button>
        )}
      {followState ? <button onClick={() => setToggleFollow() }>Unfollow</button> :
      <button onClick={() => { setToggleFollow() }}>Follow</button>}
      </div>
    </div>
    )
  
}