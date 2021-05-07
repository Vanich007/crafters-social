import React, {useState,useEffect} from 'react';
import s from './Profile.module.css';
import { onAddPosts,onDeletePostById,onAddPostPhoto,onSetPostTitleBody,onSelectTag,onClearPost } from '../../reducers/profileReducer'
import {getProfileFetch} from '../../reducers/signupReducer'
import { connect } from 'react-redux'
import { getCommentsByPostId,getPostsByUserId ,sendPostComment,deletePostById,likeCommentById,unlikeCommentById,likePostById,unlikePostById} from '../../utils/API/connectPosts'
import { getProfileByUserId } from '../../utils/API/connectProfile' 
import { getPhotoByUserId } from '../../utils/API/connectPhoto'
//import Preloader from '../../utils/preloader'
import Post from './Post'
import AddPostContainer from './AddPost'
import ProfileAnketaContainer from './ProfileAnketa'
import Modal from '../common/Modal'


const Profile = (props) => {
  let [modalActive,setModalActive]=useState(true)
  let [addPostState, toggleAddPost] = useState(false)
  let [postsIsFetching,setPostsIsFetching]= useState(false)
useEffect(()=> {
    // if (!props.match.params.userId) {
    setPostsIsFetching(true)
    props.getProfileFetch()
    if(props.currentUser._id){
    props.getProfileByUserId(props.currentUser._id) 
    props.getPostsByUserId(props.currentUser._id) 
    props.getPhotoByUserId(props.currentUser._id) }
    setPostsIsFetching(false)
    },[props.currentUser._id])
  
  // componentDidUpdate(prevProps) {
  //   if (props.currentUser._id)
  //   if(props.currentUser._id!==prevProps.currentUser._id){
  //     props.getProfileByUserId(props.currentUser._id) 
  //     props.getPostsByUserId(props.currentUser._id) 
  //     props.getPhotoByUserId(props.currentUser._id) 
  //   } 
  //   // if ((props.userId !== prevProps.userId)||(props.match.params.userId!==prevProps.match.params.userId))
  //   // {props.getProfileByUserId(props.currentUser._id) 
  //   // props.getPostsByUserId(props.currentUser._id) }
  // }

 
    
   // console.log('profile comments',props.postComments)
    let post=[]
   if (!postsIsFetching)
    post = props.posts.map(item => {
      return <li key={item._id}><Post  onClearPost={props.onClearPost} 
      unlikePostById={props.unlikePostById} likePostById={props.likePostById}
      onSetPostTitleBody={props.onSetPostTitleBody} onSelectTag={props.onSelectTag} 
      onAddPostPhoto={ props.onAddPostPhoto} likeCommentById={ props.likeCommentById} 
      unlikeCommentById={ props.unlikeCommentById} deletePostById={props.deletePostById}
        currentUsername={props.currentUser.username} 
        postTags={item.postTags} getCommentsByPostId={props.getCommentsByPostId} 
        sendPostComment={props.sendPostComment} postComments={props.postComments} id={item._id}
        date={item.date} postTitle={item.postTitle} postBody={item.postBody}
        userId={item.user} currentUserId={props.currentUser._id} postLikes={item.likes}
        postImageSrc={item.postImageSrc} user={props.publicName } 
        profileImageSrc={props.profileImageSrc}/></li>
    })
  return (<div className={ s.profile__top}><h1>Профиль пользователя {props.publicName}</h1>
      <ProfileAnketaContainer  />
      {addPostState ? (<Modal active={modalActive} setActive={setModalActive}
        setFalseAfter={toggleAddPost}>
        <AddPostContainer /> </Modal>
      ) : <button title="Добавить пост" className={ s.add_post_button} onClick={() => { toggleAddPost(true) }}></button>}
      
      <ul>{post}</ul> 
     
      </div>)
    
  
}


 const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser,
      posts: state.profilePage.posts,
      postComments: state.profilePage.postComments,
      status: state.profilePage.status,
      livingPlace:state.profilePage.livingPlace,
      profileImageSrc:state.profilePage.profileImageSrc,
      date: state.profilePage.date,
      publicName:state.profilePage.publicName,
      postsIsFetching: state.profilePage.postsIsFetching,
      profileIsFetching: state.profilePage.profileIsFetching,
      profileId:state.profilePage.profileId,
      searchedTag: state.tagsPage.searchedTag
      
    }
  }
        

  
const ProfileContainer = connect(mapStateToProps, {onAddPostPhoto,
  onAddPosts, sendPostComment, onDeletePostById, getPostsByUserId, getProfileFetch,
  getCommentsByPostId, getProfileByUserId, getPhotoByUserId, deletePostById, likeCommentById,
  unlikeCommentById,  likePostById,unlikePostById,onSelectTag,onSetPostTitleBody,onClearPost
})(Profile);

export default ProfileContainer;

