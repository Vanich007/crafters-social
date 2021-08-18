import s from './Post.module.css';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../common/Modal'

//import { AddPost } from './AddPost'
import AddPostContainer from './AddPost'
//import {getCommentsByPostId} from '../../utils/API/connectPosts'


function Post(props) {
 //console.log(props)
let [readMoreState,setReadMoreState]=useState(true)
  //let background= `background-image:url('${props.postImageSrc}')`
  let date=props.date
    date = date.substr(0, 10)
    
  // useEffect(() => { 
  //   props.getSelectedUserProfileByUserId(props.userId) 
    
  // },[props.userId])

  useEffect(() => { 
  props.getCommentsByPostId(props.id)
  
},[props.id])

  function ReadMoreFoo() {
    if (readMoreState) { setReadMoreState(false) } else { setReadMoreState(true) }
  }
  
    return (
      <div>
        
        {readMoreState ? (<ReadMore publicName={props.publicName}
        user={props.user} postLink={props.postLink } onClearPost={props.onClearPost} 
        onSetPostTitleBody={props.onSetPostTitleBody}  onSelectTag={props.onSelectTag} 
        onAddPostPhoto={props.onAddPostPhoto}
          likes={props.likes} deletePostById={props.deletePostById}
          postTags={props.postTags} ReadMoreFoo={() => ReadMoreFoo()}
          postTitle={props.postTitle} postBody={props.postBody} id={props.id}
          userId={props.userId} currentUserId={props.currentUserId}
          unlikePostById={props.unlikePostById} likePostById={props.likePostById}
            date={ date} postImageSrc={props.postImageSrc} />)
            // .split('\\').join("/")
         
          : (<Full publicName={props.publicName}
            user={props.user} postLink={props.postLink } onAddPostPhoto={props.onAddPostPhoto} likes={props.likes}
            deletePostById={props.deletePostById} onClearPost={props.onClearPost} 
            postTags={props.postTags} getCommentsByPostId={props.getCommentsByPostId}
            sendPostComment={props.sendPostComment} currentUsername={props.currentUsername}
            userId={props.userId} currentUserId={props.currentUserId}
            ReadMoreFoo={() => ReadMoreFoo()} postComments={props.postComments}
            postBody={props.postBody} id={props.id} postTitle={props.postTitle}
            unlikePostById={props.unlikePostById} likePostById={props.likePostById}
            date={date} postImageSrc={props.postImageSrc}
            likeCommentById={props.likeCommentById} unlikeCommentById={props.unlikeCommentById}
            onSelectTag={props.onSelectTag} onSetPostTitleBody={props.onSetPostTitleBody}
            clearCommentById={props.clearCommentById} />)}  
 
  
  </div>
  );
}
export function ReadMore(props) {
  
  const likeFunction=()=>{
    if(props.likes.indexOf(props.currentUserId) >= 0) {props.unlikePostById(props.id)} else 
     {props.likePostById(props.id)}
  }
  const editClick = () => {
    toggleEditPost(true);
    props.onClearPost()
    props.onAddPostPhoto(props.postImageSrc)
    if (props.postTags) props.postTags.forEach(item => props.onSelectTag(item)) 
    props.onSetPostTitleBody(props.postTitle,props.postBody,props.id)
  }

    let [modalActive,setModalActive]=useState(true)
  let [editPostState, toggleEditPost] = useState(false)
  let tags = []
  if (props.postTags) {
    tags = props.postTags.map(item => (<li  className="tags" key={item}>
      <Link to={ '/tags/' + item}>  {item}</Link>
    </li>))
  }
  const deletePost = () => props.deletePostById(props.id)
  
  return (<div className="blog-card">
    
    
       <div className="meta">
            <div className="photo" id={props.id} 
            style={{backgroundImage:`url(${window.location.protocol}//${window.location.hostname}/${props.postImageSrc})`
            }}></div>
      <ul className="details">
        {props.selectedUserProfile?<li className="author"><a href="/users/userId">{props.selectedUserProfile.publicName}</a></li> : ''}
        <li className="date">{props.date}</li>
        {tags}
      </ul>
    </div>
    <div className="description">
      <Link to={props.postLink }><h2>{props.postTitle}</h2></Link>
      
      {props.userId == props.currentUserId ?<>
        <div className={s.delete_edit_buttons}>
          
          <button title="удалить пост" className={s.delete__button } onClick={deletePost}></button>
         {editPostState ? (<Modal active={modalActive} setActive={setModalActive}
        setFalseAfter={toggleEditPost}>
            <AddPostContainer /> </Modal>
          ) : <button title="редактировать пост" className={s.edit__button}
            onClick={editClick}></button>}
        
        
        </div></> : ''}
        <div className={s.post_username}>
 <Link to={'/users/'+props.user }><b>Автор: {props.publicName}</b></Link>
 </div>
      
      
             <p className='descrtext'> {props.postBody}</p>
      <p className="read-more">
        <button title="мне нравится!" className={props.likes.indexOf(props.currentUserId) >= 0 ? s.like__button_active : s.like__button}
          onClick={likeFunction}></button>    
        
          <span onClick={()=>props.ReadMoreFoo()}>Read More</span>
            </p>
        
    </div>
    </div>)
}



export function Full(props) {
  const likeFunction=()=>{
    if(props.likes.indexOf(props.currentUserId) >= 0) {props.unlikePostById(props.id)} else 
     {props.likePostById(props.id)}
  }
  //console.log(props)
  document.title=props.postTitle

  const editClick = () => {
    toggleEditPost(true);
    props.onClearPost()
    props.onAddPostPhoto(props.postImageSrc)
    if (props.postTags) props.postTags.forEach(item => props.onSelectTag(item)) 
    props.onSetPostTitleBody(props.postTitle,props.postBody,props.id)
  }

    let [modalActive,setModalActive]=useState(true)
  let [editPostState, toggleEditPost] = useState(false)

 // let [showButtons,setShowButtons]=useState(false)
  const deletePost=()=>props.deletePostById(props.id)
  const tags = props.postTags.map(item => (<li key={item} className={s.tags}>
    <Link to={'/tags/' + item }>{item}</Link></li>))

  //useEffect(()=>{if(props.id)props.getCommentsByPostId(props.id)},[props.postComments])

  //let [commentState,setCommentState]=useState('')
  let comments=[]  
if(props.postComments) comments = props.postComments.filter(item=>item.postId===props.id)
  let thisComments = comments.map(item => {
    const likeComment =()=> props.likeCommentById(item._id)
    const unlikeComment = () => props.unlikeCommentById(item._id)
    const editPost = () => {


    //  <AddPost  />
    }
   return (<li key={item._id}><div className='blog-card'>
            <div className={s.user}> 
            <div className={s.avatarplace}>   
            <img src={ (item.profileImageSrc?`${window.location.protocol}//${window.location.hostname}/${item.profileImageSrc}`:`${window.location.protocol}//${window.location.hostname}/images/guestavatar.gif`)} className={s.avatar}></img>  
            
      </div> 
    </div>
            <div className={s.messagearea}>
              <span className={s.date}>{item.date.substr(0,10)}</span>
       <div className={s.namemessage}>
         
                <span className={s.username}>{item.username}</span>
                <span className={s.message}>{item.commentBody}</span>
                </div>
       <div className={s.right_commentbar}>
         {item.user == props.currentUserId ? <>
           <button title="удалить комментарий" className={s.delete__button} onClick={()=>props.clearCommentById(item._id)}></button>
           {/* <button title="редактировать комментарий" className={s.edit__button} onClick={editPost}></button> */}
         </> : ''}
         
<button title="мне нравится!" className={item.likes.indexOf(props.currentUserId) >= 0 ? s.like__button_active : s.like__button}
          onClick={item.likes.indexOf(props.currentUserId)>=0?unlikeComment:likeComment}></button>    
         </div>
        </div>
  </div></li>)
 })
  
  return (<div className="blog-card-full">
    
    <img className="blog-card-full-image" src={`${window.location.protocol}//${window.location.hostname}/${props.postImageSrc}`}></img>
    <div className='descrtextfull'>
    <div className={s.post_username}>
 <Link to={'/users/'+props.user }><b>Автор: {props.publicName}</b></Link>
 </div>
      <Link to={props.postLink}><h2>{props.postTitle}</h2></Link>
      
      {props.userId == props.currentUserId ?(<>
      
        <div className={s.delete_edit_buttons}>
          
          <button title="удалить пост" className={s.delete__button } onClick={deletePost}></button>
         {editPostState ? (<Modal active={modalActive} setActive={setModalActive}
        setFalseAfter={toggleEditPost}>
            <AddPostContainer /> </Modal>
          ) : <button title="редактировать пост" className={s.edit__button}
            onClick={editClick}></button>}
        
        
        </div></>) : ''}

      {props.postBody}</div>
    
    <div className="read-more">
     
      <div className='horizontal'>
        <button title="мне нравится!" className={props.likes.indexOf(props.currentUserId) >= 0 ? s.like__button_active : s.like__button}
           onClick={likeFunction}></button>    
        {tags}
      </div><span onClick={() => props.ReadMoreFoo()}>Свернуть</span>
    <ul>
      {thisComments}
    </ul>
    
      
    </div>
    <AddComment currentUsername={props.currentUsername} sendComment={props.sendPostComment} id={props.id}/>
     </div>)
}
function AddComment (props){
  let [commentState, setCommentState] = useState('')
    
  const handleChange = event => {
    setCommentState(event.target.value); 
   
    }
  const handleSubmit = event => {
    event.preventDefault()
    
    props.sendComment({ username: props.currentUsername, postId: props.id, commentBody: commentState })
    setCommentState('')
  }



  
    return <div className={s.addcomment}>
      <form onSubmit={handleSubmit}>
        <div className={ s.centerform}>
        <h3>Добавить комментарий</h3>
        <div className={s.enterdata}>
        <textarea
          name='commentState'
          placeholder='Текст коммента...'
          value={commentState}
          required='required'
          onChange={handleChange}
          />
          </div >
        <input type='submit'/>
        </div>
      </form></div>
    

}


export default Post;