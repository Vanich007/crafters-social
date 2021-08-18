import React,{useEffect} from 'react'
import ShowProfile from './ShowProfile';
import { onSelectedUser } from '../../reducers/usersReducer'
import { follow, unfollow } from '../../utils/API/connectProfile'
import {likePostById,unlikePostById} from '../../utils/API/connectPosts'
import { getSelectedUserProfileByUserId, getSelectedUserPostsByUserId, getSelectedUserPhotoByUserId } from '../../utils/API/connectSelectedProfile'
import {userMessageSend } from '../../utils/API/connectDialogs'
import { getCommentsByPostId,getPostsByUserId ,sendPostComment,likeCommentById,unlikeCommentById} from '../../utils/API/connectPosts'
import {onSelectTag} from '../../reducers/profileReducer'
import { connect } from 'react-redux'
import Post from '../Profile/Post'
import PhotoPreview from './PhotoPreview'


function UserById(props) {
 
  useEffect(()=> {
    if (props.selectedUser) {
      props.getSelectedUserProfileByUserId(props.selectedUser)
      props.getSelectedUserPostsByUserId(props.selectedUser)
      props.getSelectedUserPhotoByUserId(props.selectedUser)
    }},[props.selectedUser]
  )
  
useEffect(()=>{const userId = props.match.params.userId;
  props.onSelectedUser(userId)
},[props.match.params.userId])   
useEffect(()=>{const userId = props.match.params.userId;
  
  document.title = 'Профиль пользователя '+props.selectedUserProfile.publicName + ` на ${process.env.REACT_APP_SITE_TITLE}`
},[props.selectedUserProfile])   

    
    let post = []
    post = props.selectedUserPosts.map(item => {
      
       return (<li key={item._id}><Post getSelectedUserProfileByUserId={props.getSelectedUserProfileByUserId} onClearPost={props.onClearPost} 
        unlikePostById={props.unlikePostById} likePostById={props.likePostById}
        onSetPostTitleBody={props.onSetPostTitleBody} onSelectTag={props.onSelectTag} 
        onAddPostPhoto={ props.onAddPostPhoto} likeCommentById={ props.likeCommentById} 
        unlikeCommentById={ props.unlikeCommentById} deletePostById={props.deletePostById}
          currentUsername={props.currentUser.username} 
          postTags={item.postTags} getCommentsByPostId={props.getCommentsByPostId} 
          sendPostComment={props.sendPostComment} postComments={props.postComments} id={item._id}
          date={item.date} postTitle={item.postTitle} postBody={item.postBody}
          userId={item.user} currentUserId={props.currentUser._id} likes={item.likes}
          postImageSrc={item.postImageSrc} user={props.publicName } 
          profileImageSrc={props.profileImageSrc}
          onSelectTag={props.onSelectTag} sendPostComment={props.sendPostComment} 
          likeCommentById={props.likeCommentById} 
          unlikeCommentById={props.unlikeCommentById}/></li>)
     })
    let userId=props.selectedUser?props.selectedUser._id:''
   
    return (<div><ShowProfile followMass={props.followMass} currentUser={props.currentUser} follow={props.follow} unfollow={props.unfollow}
      selectedUserProfile={props.selectedUserProfile} getSelectedUserProfileByUserId={props.getSelectedUserProfileByUserId}
    userMessageSend={props.userMessageSend} selectedUser={props.selectedUser} />
 
      
      <h3>Галлерея пользователя</h3>
      {props.selectedUserPhotos.length?<PhotoPreview photos={ props.selectedUserPhotos}/>:'Фото не загружены'}
      
    { post }
    </div>)
  
}



 const mapStateToProps = (state) => {
   return {
      followMass: state.profilePage.follow,
      selectedUser: state.usersPage.selectedUser,
      selectedUserPhotos: state.usersPage.selectedUserPhotos,
      selectedUserProfile:state.usersPage.selectedUserProfile,
      selectedUserPosts: state.usersPage.selectedUserPosts,
    //follow:state.profilePage.follow,
    currentUser: state.signupPage.currentUser
    
    }
  }
        

  
const UserByIdContainer = connect(mapStateToProps, {
  onSelectedUser, getSelectedUserProfileByUserId, getSelectedUserPostsByUserId,
  getSelectedUserPhotoByUserId,userMessageSend,follow,unfollow,unlikePostById,
  likePostById,getCommentsByPostId,onSelectTag,sendPostComment,likeCommentById,unlikeCommentById})(UserById);




export default UserByIdContainer;