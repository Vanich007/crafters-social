import React, {useState,useEffect} from 'react';
import { getPostsByTag } from '../../utils/API/connectTags'
import { getProfileFetch } from '../../reducers/signupReducer'
import {onClearPost} from '../../reducers/profileReducer'
import { connect } from 'react-redux'
import { getLenta,getCommentsByPostId } from '../../utils/API/connectPosts'
import { getProfileByUserId } from '../../utils/API/connectProfile' 
//import Preloader from '../../utils/preloader'
import Post from '../Profile/Post'


const Lenta = (props) => {
  console.log(props)
    useEffect(() => {
    document.title = 'Лента новостей '+ ` на ${process.env.REACT_APP_SITE_TITLE}`
  }, [])
  let [postsIsFetching, setPostsIsFetching] = useState(false)
  
  useEffect(() => {
    // if (!props.match.params.userId) {
    setPostsIsFetching(true)
    props.getLenta()
    if (props.currentUser._id) {
      // props.getProfileByUserId(props.currentUser._id) 
      // props.getPostsByTag(props.currentUser._id)
    
      setPostsIsFetching(false)
    }
  },[props.currentUser._id])

const post = props.searchedPosts.map(item => {
  return <li key={item._id}><Post onClearPost={ props.onClearPost} likes={ item.likes} currentUsername={props.currentUser.username}
        postTags={item.postTags} getCommentsByPostId={props.getCommentsByPostId} 
        sendPostComment={props.sendPostComment} postComments={props.postComments} id={item._id}
        date={item.date} postTitle={item.postTitle} postBody={item.postBody}
        postImageSrc={item.postImageSrc} user={props.publicName } profileImageSrc={props.profileImageSrc}/></li>
})
  return <>
    <h1>Лента новостей</h1>
    {post}
  </>
}

const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser,
      searchedPosts: state.profilePage.searchedPosts,
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
        

  
const LentaContainer = connect(mapStateToProps, {
      getProfileFetch,getLenta, getCommentsByPostId ,
  getProfileByUserId,getPostsByTag,onClearPost
})(Lenta);

export default LentaContainer;