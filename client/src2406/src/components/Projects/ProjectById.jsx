import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { onGetProjects, onAddProject, onDeleteProject, onSetProjectTitleBody } from '../../reducers/projectsReducer'
import {getSelectedUserProfileByUserId} from '../../utils/API/connectSelectedProfile'
import { onAddPosts,onDeletePostById,onAddPostPhoto,onSetPostTitleBody,onSelectTag,onClearPost } from '../../reducers/profileReducer'
//import {onSelectTag} from '../../reducers/profileReducer'
import { getProjectById, getProjectByUserId, deleteProjectById, sendUserProject, updateUserProject, unlikeProjectById, likeProjectById } from '../../utils/API/connectProjects'
import { getCommentsByPostId, getPostsByUserId, sendPostComment, deletePostById, likeCommentById, unlikeCommentById, likePostById, unlikePostById } from '../../utils/API/connectPosts'
import { getProfileByUserId } from '../../utils/API/connectProfile' 
import AddProjectContainer from './AddProject'
import s from './Project.module.css';
import Post from '../Profile/Post'

import Modal from '../common/Modal'

function ProjectById(props) { //отобразит прроект из projects[0]
  console.log(props)
    useEffect(() => {
    document.title = 'Проект '+props.projects[0].projectTitle + ` - ${process.env.REACT_APP_SITE_TITLE}`
  }, [])
  
   let { likes, projectPosts,projectTags, projectTitle, projectBody, _id, projectImageSrc, user, date } = props.projects[0] 
 
  let [modalActive, setModalActive] = useState(true)
  
let [projectIsFetching, setProjectIsFetching] = useState(false)
  let projectId = props.match.params.projectId
  useEffect(() => {
    // if (!props.match.params.userId) {
    setProjectIsFetching(true)
    props.getProjectById(projectId)
    if (projectId) {
      props.getProjectById(projectId)
      setProjectIsFetching(false)
    }
  },[projectId])

  function ReadMoreFoo() {
    // if (readMoreState) { setReadMoreState(false) } else { setReadMoreState(true) }
  }
  let posts =[]
  if (props.searchedPosts) {posts=props.searchedPosts.map(item => {
    console.log('item',item)
    console.log('props',props)
    if (!item)return
    let date =''
    if(item) if (item.date) date=item.date.substr(0, 10)
    const postLink = '/posts/' + item._id
    return <Post selectedUserProfile={props.selectedUserProfile}
          getSelectedUserProfileByUserId={props.getSelectedUserProfileByUserId}
      onSetPostTitleBody={props.onSetPostTitleBody} onSelectTag={props.onSelectTag} 
      onAddPostPhoto={props.onAddPostPhoto} onAddPostPhoto={props.onAddPostPhoto} 
      onClearPost={props.onClearPost} postLink={postLink} likes={item.likes}
            deletePostById={props.deletePostById}
            postTags={item.postTags} getCommentsByPostId={props.getCommentsByPostId}
            sendPostComment={props.sendPostComment} currentUsername={props.currentUser.username}
            userId={props.userId} currentUserId={props.currentUser._id}
            ReadMoreFoo={() => ReadMoreFoo()} postComments={props.postComments}
            postBody={item.postBody} id={item._id} postTitle={item.postTitle}
            unlikePostById={props.unlikePostById} likePostById={props.likePostById}
            date={date} postImageSrc={item.postImageSrc}
            likeCommentById={ props.likeCommentById} unlikeCommentById={ props.unlikeCommentById}/>
   
})}


  let currentUserId=props.currentUser._id
  const id = _id
 

   const likeFunction=()=>{
     console.log('id=',id)
    if(likes.indexOf(currentUserId) >= 0) {props.unlikeProjectById(id)} else 
     {props.likeProjectById(id)}
  }
  const editClick = () => {
    toggleEditProject(true);
    //props.onClearproject()
   // props.onAddProjectPhoto(projectImageSrc)
    if (projectTags) projectTags.forEach(item => props.onSelectTag(item)) 
    props.onSetProjectTitleBody(projectTitle,projectBody,id)
  }
    
  let [editProjectState, toggleEditProject] = useState(false)
  let tags = []
  if (projectTags) {
    tags = projectTags.map(item => (<li key={item}>
      <Link to={ '/projects/' + item}>  {item}</Link>
    </li>))
  }
  const deleteProject=()=>props.deleteProjectById(id)
let comments=[]
  if(props.postComments) comments = props.postComments.filter(item=>item.postId===props.id)
  let thisComments = comments.map(item => {
    const likeComment =()=> props.likeCommentById(props.id)
    const unlikeComment = () => props.unlikeCommentById(props.id)
    const editPost = () => {


    //  <AddPost  />
    }
   return (<div className='blog-card'>
            <div className={s.user}> 
            <div className={s.avatarplace}>       
     
      </div> 
    </div>
            <div className={s.messagearea}>
                <div className={s.namemessage}>
                <span className={s.username}>{item.username}</span>
                <span className={s.message}>{item.commentBody}</span>
                </div>
       <div className={s.right_commentbar}>
         <span className={s.date}>{props.date}</span>
         {item.user == props.currentUserId ? <div> <button title="удалить пост" className={s.delete__button } ></button>
           <button title="редактировать пост" onClick={editPost}>edit</button>
         </div> : ''}
         
<button title="мне нравится!" className={item.likes.indexOf(props.currentUserId) >= 0 ? s.like__button_active : s.like__button}
          onClick={item.likes.indexOf(props.currentUserId)>=0?likeComment:unlikeComment}></button>    

         
         </div>
        </div>

      

  </div>)
    // <li key={item._id}>{item.username}=>{item.commentBody}</li>)
  })
  
  return (
       <div className={s.project}>
    
    <img className="blog-card-full-image" src={props.postImageSrc}></img>
      <p className='descrtextfull'>
            {user == props.currentUser._id ?
        <div className={s.delete_edit_buttons}>
          
          <button title="удалить проект" className={s.delete__button } onClick={deleteProject}></button>
         {editProjectState ? (<Modal active={modalActive} setActive={setModalActive}
        setFalseAfter={toggleEditProject}>
            <AddProjectContainer /> </Modal>
          ) : <button title="редактировать проект" className={s.edit__button } onClick={ editClick }></button>}
        
        
        </div> : ''}
      <h2>{projectTitle}</h2>
      {projectBody}</p>
    
    <p className="read-more">
     
      <div className='horizontal'>
        <button title="мне нравится!" className={likes.indexOf(props.currentUser._id) >= 0 ? s.like__button_active : s.like__button}
          onClick={likeFunction}>
          //{likes.indexOf(props.currentUser._id)>=0?props.likeProjectById:props.unlikeProjectById}>
            </button>    
        {tags}
      </div>
        <ul>
          {posts}
      {thisComments}
    </ul>
    
      
    </p>
    {/* <AddComment currentUsername={props.currentUsername} sendComment={props.sendPostComment} id={props.id}/> */}
     </div>
    //< div className = "blog-card" >
    
    
  //      <div className="meta">
  //           <div className="photo" id={id} style={{backgroundImage:'url('+projectImageSrc+')'}}></div>
  //     <ul className="details">
  //       <li className="author"><a href="#">{user}</a></li>
  //       <li className="date"><a href="#">{date}</a></li>
  //       <li className="tags">
  //         <ul>
  //           {tags}
  //         </ul>
  //       </li>
  //     </ul>
  //   </div>
  //   <div className="description">
  //     <Link to={_id }><h2>{projectTitle}</h2></Link>
      
  
      
      
  //            <p className='descrtext'> {projectBody}</p>
  //     <p className="read-more">
  //       <button title="мне нравится!" className={likes.indexOf(currentUserId) >= 0 ? s.like__button_active : s.like__button}
  //         onClick={likeFunction}></button>    
        
  //         <span onClick={()=>props.ReadMoreFoo()}>Read More</span>
  //           </p>
      
       
            
  //   </div>

  //   </div>
  //full
 
  
  
  )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.signupPage.currentUser,
      projects: state.projectsPage.projects,
      profileId:state.profilePage.profileId,
      selectedUser: state.usersPage.selectedUser,
      postComments: state.profilePage.postComments,
      searchedPosts:state.profilePage.searchedPosts
      
      // selectedTags:state.projectsPage.selectedTags,
// projectBody: state.projectsPage.projectBody,
//     projectTitle: state.projectsPage.projectTitle,
//     projectPosts:state.projectsPage.projectPosts,
//     projectImageSrc: state.projectsPage.projectImageSrc,
//     projectId:state.projectsPage.projectId
    }
  }
        

  
const ProjectByIdContainer = connect(mapStateToProps, { onGetProjects, onAddProject, onDeleteProject, getProjectByUserId,
  deleteProjectById, sendUserProject, updateUserProject, onSetProjectTitleBody,
  unlikeProjectById,likeProjectById,onSelectTag,getProjectById,onAddPosts, sendPostComment, onDeletePostById, getPostsByUserId, 
  getCommentsByPostId, getProfileByUserId,  deletePostById, likeCommentById,
  unlikeCommentById, likePostById, unlikePostById, onSetPostTitleBody, onClearPost, onAddPostPhoto,
  getSelectedUserProfileByUserId
 
})(ProjectById);

export default ProjectByIdContainer;