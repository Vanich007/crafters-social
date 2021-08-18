import React, {useState,useEffect} from 'react';
import UploadImage from './UploadImage'
import s from './ProfileAnketa.module.css'
import { getProfileByUserId ,updateProfile, userProfileSend} from '../../utils/API/connectProfile'
import { connect } from 'react-redux'
import Modal from '../common/Modal'
import ImageUpload from '../common/UploadImage'

 


export function ProfileAnketa({getProfileByUserId,userProfileSend,currentUser, profileId, profileImageSrc,
  date, status = 'No status', livingPlace, publicName, updateProfile }) {
   let [modalActive,setModalActive]=useState(true)
  console.log('profileImageSrc',profileImageSrc)
  
  let [changeAvatar,toggleChangeAvatar]=useState(false)
  let [statusState, setStatusState] = useState(status)
  let [livingPlaceState, setLivingPlaceState] = useState(livingPlace)
  let [publicNameState, setPublicNameState] = useState(publicName)
  let [profileImageSrcState, setprofileImageSrcState] = useState(profileImageSrc)
  let [statusIsEditing, setStatusIsEditing] = useState(false)
  let [LivingPlaceIsEditing, setLivingPlaceIsEditing] = useState(false)
  let [publicNameIsEditing, setPublicNameIsEditing] = useState(false)
  

  useEffect(() => { if (publicNameIsEditing) { document.getElementById('publicName').focus() } }, [publicNameIsEditing])
  useEffect(() => { if (LivingPlaceIsEditing) { document.getElementById('livingPlace').focus() } }, [LivingPlaceIsEditing])
  useEffect(() => { if (statusIsEditing) { document.getElementById('status').focus() }},[statusIsEditing])
  useEffect(()=>setStatusState(status),[status])
  useEffect(()=>setLivingPlaceState(livingPlace),[livingPlace])
  useEffect(()=>setPublicNameState(publicName),[publicName])
  useEffect(()=>setprofileImageSrcState(profileImageSrc),[profileImageSrc])
  
  useEffect(()=>getProfileByUserId(currentUser._id),[])

  const handleChange = event => {
    switch (event.target.name) {
      case 'status': setStatusState(event.target.value); break
      case 'livingPlace': setLivingPlaceState(event.target.value); break
      case 'publicName': setPublicNameState(event.target.value); break
      
    }
  }
  
  const Blur = type => {
    //event.preventDefault()
    switch (type) {
      case 'status': setStatusIsEditing(false); break;
      case 'livingPlace': setLivingPlaceIsEditing(false); break;
      case 'publicName': setPublicNameIsEditing(false); break;
      
  }
  const formData = new FormData();
  // let image:File
  // image= file
  // formData.append('image', image, image.name)
   formData.append('status',statusState )
      formData.append('livingPlace', livingPlaceState)
      formData.append('publicName', publicNameState)
  userProfileSend(formData)
  }

if(!profileImageSrc){profileImageSrc= `images/guestavatar.gif`}

const onAddProfilePhoto=(filename)=>{
const formData = new FormData()
let image:File
image= filename
formData.append('image', image, image.name)
 formData.append('status',statusState )
    formData.append('livingPlace', livingPlaceState)
    formData.append('publicName', publicNameState)
userProfileSend(formData)
  }
function publicNameClick() { setPublicNameIsEditing(true) }
  
  return (
    <div className={s.anketablock}>
   
    <div className="vertical">
      <div className={s.avatarplace}>       
     
      <ImageUpload imgSrc={profileImageSrc} onAddProfilePhoto={onAddProfilePhoto} />
      </div> 
    
    </div>
    <div className="vertical">
    {statusIsEditing ? (<div className={s.enterdata}>
      <label>Статус </label>
      <input
            name='status'
            id='status'
        placeholder='Статус'
        value={statusState}
        onChange={handleChange}
        onBlur={()=>Blur('status')}
      />
    </div >) : (<div className={s.show} onClick={()=>setStatusIsEditing(true) }>
      <label>Статус </label><b>{statusState}</b></div>
        
    )}
       {LivingPlaceIsEditing ? (<div className={s.enterdata}>
        <label>Место жительства</label>
        <input
            name='livingPlace'
            id='livingPlace'
          placeholder='Место жительства'
          value={livingPlaceState}
        onChange={handleChange}
        onBlur={()=>Blur('livingPlace')}
          />
    </div >) : (<div className={s.show} onClick={() => setLivingPlaceIsEditing(true)}>
         <label>Место жительства </label><b>{livingPlaceState}</b></div>
      )}
    
      {publicNameIsEditing ? (<div className={s.enterdata}>
        <label>Имя пользователя</label>
        <input
            name='publicName'
            id='publicName'
          placeholder='Имя пользователя'
          value={publicNameState}
          onChange={handleChange}
         onBlur={()=>Blur('publicName')}
          />
        </div >) : (<div className={s.show} onClick={publicNameClick}>
         <label>Имя пользователя </label><b>{publicNameState}</b></div>
        )}
      </div>
       
    

    </div>)
  
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.signupPage.currentUser,
    
    status: state.profilePage.status,
    livingPlace:state.profilePage.livingPlace,
    profileImageSrc:state.profilePage.profileImageSrc,
    date: state.profilePage.date,
    publicName:state.profilePage.publicName,
    profileIsFetching: state.profilePage.profileIsFetching,
    profileId:state.profilePage.profileId
  }
}
      


const ProfileAnketaContainer = connect(mapStateToProps,
   {updateProfile,getProfileByUserId,userProfileSend})(ProfileAnketa);




export default ProfileAnketaContainer;