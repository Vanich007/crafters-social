import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onAddPosts,onDeletePostById,onAddPostPhoto,onSetPostTitleBody,onSelectTag,onClearPost } from '../../reducers/profileReducer'
//import {onSelectTag} from '../../reducers/profileReducer'
import { getPostById,clearCommentById  } from '../../utils/API/connectPosts'
import { getCommentsByPostId, getPostsByUserId, sendPostComment, deletePostById, likeCommentById, unlikeCommentById, likePostById, unlikePostById } from '../../utils/API/connectPosts'
import { getProfileByUserId } from '../../utils/API/connectProfile' 
import { getSelectedUserProfileByUserId } from '../../utils/API/connectSelectedProfile'

import s from './Post.module.css';
import Post from './Post'

import Modal from '../common/Modal'

function PostById(props) { 
  
   
  
  
  let postId = props.match.params.postId
  useEffect(() => {
    // if (!props.match.params.userId) {
    if (postId) {
      props.getPostById(postId)
    }
  }, [postId])
  useEffect(() => {
    document.title = props.posts[0].postTitle + ` - ${process.env.REACT_APP_SITE_TITLE}`
  }, [])

    

    
  function ReadMoreFoo() {
    // if (readMoreState) { setReadMoreState(false) } else { setReadMoreState(true) }
  }
  const posts = props.posts.map(item => {
        let date=item.date.substr(0, 10)
    
    return (<li key={item._id}><Post onClearPost={onClearPost} clearCommentById ={props.clearCommentById }
      getSelectedUserProfileByUserId={ props.getSelectedUserProfileByUserId } postLink={'/posts/' + item._id} ReadMoreFoo={ReadMoreFoo} 
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
        profileImageSrc={props.profileImageSrc}/></li>)
  })
  return <div>
    <ul>
      {posts}
    </ul>
         </div>
    
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.signupPage.currentUser,
      projects: state.projectsPage.projects,
      profileId:state.profilePage.profileId,
      selectedUser: state.usersPage.selectedUser,
      posts: state.profilePage.searchedPosts,
      postComments: state.profilePage.postComments

    }
  }
        

  
const PostByIdContainer = connect(mapStateToProps, {
  onAddPosts, sendPostComment,   onDeletePostById, getPostsByUserId, 
  getCommentsByPostId, getProfileByUserId,  deletePostById, likeCommentById,
  unlikeCommentById, likePostById, unlikePostById, onSelectTag, onSetPostTitleBody,
  onClearPost, getPostById, onAddPostPhoto,getSelectedUserProfileByUserId,clearCommentById 
 
})(PostById);

export default PostByIdContainer;