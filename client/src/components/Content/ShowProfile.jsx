import React, {useState} from 'react';
import s from './ShowProfile.module.css'
import SendMessage from './SendMessage';
import Modal from '../common/Modal'



export default function ProfileAnketa({ selectedUserProfile, ...props }) {
  let [modalActive,setModalActive]=useState(true)
  let [sendMessageState, setSendMessage] = useState(false)
  let [followState, ToggleFollow] = useState(false)   //есть ли связь follow
  const setToggleFollow = () => {
    if (followState) { ToggleFollow(false); props.unfollow(props.userId) }
    
  else {ToggleFollow(true); props.follow(props.userId)}
  }

  const profileImageSrc = selectedUserProfile.profileImageSrc
  //console.log(sendMessageState,modalActive)
  return (<div className={s.anketablock}>
          <div className={s.avatarplace}>       
      <img src={window.location.origin + "/" + (profileImageSrc?profileImageSrc:'uploads/images/guestavatar.gif')} className={s.avatar}></img>
      </div> 
    {/* {(selectedUserProfile.profileImageSrc)?<img src={selectedUserProfile.profileImageSrc}></img>:''} */}
    <div className={s.profcol}>
     <div className={s.line} >
      <label>Статус </label><b>{selectedUserProfile.status}</b></div>
      <div className={s.line} ><label>Место жительства </label><b>{selectedUserProfile.livingPlace}</b></div>
      <div className={s.line} ><label>Имя пользователя </label><b>{selectedUserProfile.publicName}</b></div>
      {sendMessageState ? (<Modal active={modalActive} setActive={setModalActive} setFalseAfter={setSendMessage}>
        <SendMessage userMessageSend={props.userMessageSend} userId={props.selectedUser} />
        </Modal>
      ) : (
        <button onClick={()=>{setSendMessage(true)}}>Отправить сообщение</button>
        )}
      {followState ? <button onClick={() => setToggleFollow() }>Unfollow</button> :
      <button onClick={() => { setToggleFollow() }}>Follow</button>}
      </div>
    </div>
    )
  
}