import React, {useState,useEffect} from 'react';
import { getPostsByTag } from '../../utils/API/connectTags'
import { getProfileFetch } from '../../reducers/signupReducer'
import {onClearPost} from '../../reducers/profileReducer'
import { connect } from 'react-redux'
import { getCommentsByPostId,getPostsByUserId ,sendPostComment} from '../../utils/API/connectPosts'
import { getProfileByUserId } from '../../utils/API/connectProfile' 
//import Preloader from '../../utils/preloader'
import Post from '../Profile/Post'
import Modal from '../common/Modal'

const SearchedPosts = (props) => {
    useEffect(() => {
    document.title = 'Поиск постов по тэгу '+props.match.params.tag + ` на ${process.env.REACT_APP_SITE_TITLE}`
  }, [])
  let [modalActive,setModalActive]=useState(true)
  let [addPostState, toggleAddPost] = useState(false)
let [postsIsFetching, setPostsIsFetching] = useState(false)
  let tag=props.match.params.tag
  useEffect(() => {
    // if (!props.match.params.userId) {
    setPostsIsFetching(true)
    props.getProfileFetch()
    if (props.currentUser._id) {
      // props.getProfileByUserId(props.currentUser._id) 
      
    
      setPostsIsFetching(false)
    }
  },[props.currentUser._id])
useEffect(()=>{props.getPostsByTag(tag)},[tag])
const post = props.posts.map(item => {
  return <li key={item._id}><Post onClearPost={ props.onClearPost} likes={ item.likes} currentUsername={props.currentUser.username}
        postTags={item.postTags} getCommentsByPostId={props.getCommentsByPostId} 
        sendPostComment={props.sendPostComment} postComments={props.postComments} id={item._id}
        date={item.date} postTitle={item.postTitle} postBody={item.postBody}
        postImageSrc={item.postImageSrc} user={props.publicName } profileImageSrc={props.profileImageSrc}/></li>
})
  return <>
    <h1>Посты по тегу { tag}</h1>
    {post}
  </>
}

const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser,
      posts: state.profilePage.searchedPosts,
      postComments: state.profilePage.postComments,
      status: state.profilePage.status,
      livingPlace:state.profilePage.livingPlace,
      profileImageSrc:state.profilePage.profileImageSrc,
      date: state.profilePage.date,
      publicName:state.profilePage.publicName,
      postsIsFetching: state.profilePage.postsIsFetching,
      profileIsFetching: state.profilePage.profileIsFetching,
      profileId:state.profilePage.profileId
      
    }
  }
        

  
const SearchedPostsContainer = connect(mapStateToProps, {
   sendPostComment,  getPostsByUserId, getProfileFetch,
  getCommentsByPostId,getProfileByUserId,getPostsByTag,onClearPost
})(SearchedPosts);

export default SearchedPostsContainer;