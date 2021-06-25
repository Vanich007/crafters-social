import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import querystring  from "querystring"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onAddPosts,onDeletePostById,onAddPostPhoto,onSetPostTitleBody,onSelectTag,onClearPost } from '../../reducers/profileReducer'
//import {onSelectTag} from '../../reducers/profileReducer'
import { getPostById } from '../../utils/API/connectPosts'
import { getCommentsByPostId, getPostsByUserId, sendPostComment, deletePostById, likeCommentById, unlikeCommentById, likePostById, unlikePostById } from '../../utils/API/connectPosts'
import {getSelectedUserProfileByUserId} from '../../utils/API/connectSelectedProfile'
import { getProfileByUserId } from '../../utils/API/connectProfile' 
import s from './SearchPosts.module.css';
import { searchPostsByKeyword } from '../../utils/API/connectPosts'
import Post from '../Profile/Post'

const SearchPosts = (props) => {
    
    const {searchPostsByKeyword}=props
    let [searchStringState, setSearchStringState]=useState('')
   const history=useHistory()

   

  const parsed=querystring.parse(history.location.search.substr(1))
   useEffect(()=>{
    
    
    setSearchStringState(parsed.post)
    searchPostsByKeyword(parsed.post);
    document.title = 'Поиск постов по ключевому слову '+ ` на ${process.env.REACT_APP_SITE_TITLE}`
  },[parsed.post])

const handleChange = event => {
  switch (event.target.name) {
    case 'searchString': setSearchStringState(event.target.value); 
    searchPostsByKeyword(event.target.value);
    history.push({
      pathname:'/search',
      search:`?post=${event.target.value}`
    })
    break
  }
}

    

  function ReadMoreFoo() {
    // if (readMoreState) { setReadMoreState(false) } else { setReadMoreState(true) }
  }
  const posts = props.searchedPosts.map(item => {
    const date = item.date.substr(0, 10)
    const postLink = '/posts/' + item._id
    return <Post publicName={item.publicName} selectedUserProfile={ props.selectedUserProfile} getSelectedUserProfileByUserId={ props.getSelectedUserProfileByUserId} onSetPostTitleBody={ props.onSetPostTitleBody} onSelectTag={ props.onSelectTag} onAddPostPhoto={props.onAddPostPhoto} onAddPostPhoto={ props.onAddPostPhoto} onClearPost={props.onClearPost} postLink={postLink}  likes={item.likes}
            deletePostById={props.deletePostById}
            postTags={item.postTags} getCommentsByPostId={props.getCommentsByPostId}
            sendPostComment={props.sendPostComment} currentUsername={props.currentUsername}
            user={item.user} currentUserId={props.currentUserId}
            ReadMoreFoo={() => ReadMoreFoo()} postComments={props.postComments}
            postBody={item.postBody} id={item._id} postTitle={item.postTitle}
            unlikePostById={props.unlikePostById} likePostById={props.likePostById}
            date={date} postImageSrc={item.postImageSrc}
            likeCommentById={ props.likeCommentById} unlikeCommentById={ props.unlikeCommentById}/>
   
})
    return (
        <div className={s.usersList}>
<h1>Поиск постов по ключевому слову</h1>
     
      <div className={s.buttons}>
      {/* <label>Имя пользователя</label> */}
        <input
          name='searchString'
          placeholder='Поиск по постам всех пользователей'
          value={searchStringState}
          onChange={handleChange}
        
          />
     <button className={s.search__button} onClick={()=>props.searchPostsByKeyword(searchStringState) }>Поиск</button>
  
      </div>
      
      <div className={s.userInfo}>
          <ul>{posts}</ul>
        </div>
    </div>);
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.signupPage.currentUser,
      projects: state.projectsPage.projects,
      profileId:state.profilePage.profileId,
      selectedUser: state.usersPage.selectedUser,
      searchedPosts: state.profilePage.searchedPosts,
      postComments: state.profilePage.postComments

    }
  }
        

  
const SearchPostsContainer = connect(mapStateToProps, {
    searchPostsByKeyword,
  onAddPosts, sendPostComment,   onDeletePostById, getPostsByUserId, 
  getCommentsByPostId, getProfileByUserId,  deletePostById, likeCommentById,
  unlikeCommentById, likePostById, unlikePostById, onSelectTag, onSetPostTitleBody,
  onClearPost, getPostById, onAddPostPhoto,getSelectedUserProfileByUserId
 
})(SearchPosts);

export default SearchPostsContainer;