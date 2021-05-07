import s from './Post.module.css';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../common/Modal'
import { AddPost } from './AddPost'
import AddPostContainer from './AddPost'
//import {getCommentsByPostId} from '../../utils/API/connectPosts'


function Post(props) {
  console.log('props.postImageSrc=',props.postImageSrc)
let [readMoreState,setReadMoreState]=useState(true)
  //let background= `background-image:url('${props.postImageSrc}')`
  let date=props.date
    date = date.substr(0, 10)
    
  function ReadMoreFoo() {
    if (readMoreState) { setReadMoreState(false) } else { setReadMoreState(true) }
  }
  
    return (
      <div>
        
        {readMoreState ? (<ReadMore onClearPost={props.onClearPost} 
        onSetPostTitleBody={props.onSetPostTitleBody}  onSelectTag={props.onSelectTag} 
        onAddPostPhoto={props.onAddPostPhoto}
          postLikes={props.postLikes} deletePostById={props.deletePostById}
          postTags={props.postTags} ReadMoreFoo={() => ReadMoreFoo()}
          postTitle={props.postTitle} postBody={props.postBody} id={props.id}
          userId={props.userId} currentUserId={props.currentUserId}
          unlikePostById={props.unlikePostById} likePostById={props.likePostById}
            date={ date} postImageSrc={props.postImageSrc.split('\\').join("/")} />)
         
          : (<Full onAddPostPhoto={props.onAddPostPhoto} postLikes={props.postLikes}
            deletePostById={props.deletePostById}
            postTags={props.postTags} getCommentsByPostId={props.getCommentsByPostId}
            sendPostComment={props.sendPostComment} currentUsername={props.currentUsername}
            userId={props.userId} currentUserId={props.currentUserId}
            ReadMoreFoo={() => ReadMoreFoo()} postComments={props.postComments}
            postBody={props.postBody} id={props.id} postTitle={props.postTitle}
            unlikePostById={props.unlikePostById} likePostById={props.likePostById}
            date={date} postImageSrc={props.postImageSrc}
            likeCommentById={ props.likeCommentById} unlikeCommentById={ props.unlikeCommentById}/>)}  
 
  
  </div>
  );
}
function ReadMore(props) {
  const likeFunction=()=>{
    if(props.postLikes.indexOf(props.currentUserId) >= 0) {props.unlikePostById(props.id)} else 
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
    tags = props.postTags.map(item => (<li key={item}>
      <Link to={process.env.PUBLIC_URL + 'tags/' + item}>  {item}</Link>
    </li>))
  }
  const deletePost=()=>props.deletePostById(props.id)
  return (<div className="blog-card">
    
    
       <div className="meta">
            <div className="photo" id={props.id} style={{backgroundImage:'url('+props.postImageSrc+')'}}></div>
      <ul className="details">
        <li className="author"><a href="#">{props.user}</a></li>
        <li className="date"><a href="#">{props.date}</a></li>
        <li className="tags">
          <ul>
            {tags}
          </ul>
        </li>
      </ul>
    </div>
    <div className="description">
      <h2>{props.postTitle}</h2>
      
      {props.userId == props.currentUserId ?
        <div className={s.delete_edit_buttons}>
          
          <button title="удалить пост" className={s.delete__button } onClick={deletePost}></button>
         {editPostState ? (<Modal active={modalActive} setActive={setModalActive}
        setFalseAfter={toggleEditPost}>
            <AddPostContainer /> </Modal>
          ) : <button title="редактировать пост" className={s.edit__button } onClick={ editClick }></button>}
        
        
        </div> : ''}
      
      
             <p className='descrtext'> {props.postBody}</p>
      <p className="read-more">
        <button title="мне нравится!" className={props.postLikes.indexOf(props.currentUserId) >= 0 ? s.like__button_active : s.like__button}
          onClick={likeFunction}></button>    
        
          <span onClick={()=>props.ReadMoreFoo()}>Read More</span>
            </p>
      
       
            
    </div>

    </div>)
}
function Full(props) {
  const deletePost=()=>props.deletePostById(props.id)
  const tags = props.postTags.map(item => (<li key={item} className={s.tags}>
    <Link to={process.env.PUBLIC_URL+'tags/' + item }>{item}</Link></li>))
  useEffect(()=>{if(props.id)props.getCommentsByPostId(props.id)},[props.postComments])
  //let [commentState,setCommentState]=useState('')
  let comments=[]  
if(props.postComments) comments = props.postComments.filter(item=>item.postId===props.id)
  let thisComments = comments.map(item => {
    const likeComment =()=> props.likeCommentById(props.id)
    const unlikeComment = () => props.unlikeCommentById(props.id)
    const editPost = () => {
//const AddPostContainer = connect(mapStateToProps, {onAddPostPhoto,saveTag,onSelectTag,sendUserPost,searchTagsBySubstring})(AddPost);

    //  <AddPost  />
    }
   return (<div className='blog-card'>
            <div className={s.user}> 
            <div className={s.avatarplace}>       
      {/* <img src={window.location.origin + "/" + (profileImageSrc?profileImageSrc:'uploads/images/guestavatar.gif')} className={s.avatar}></img> */}
      </div> 
    </div>
            <div className={s.messagearea}>
                <div className={s.namemessage}>
                <span className={s.username}>{item.username}</span>
                <span className={s.message}>{item.commentBody}</span>
                </div>
       <div className={s.right_commentbar}>
         <span className={s.date}>{props.date}</span>
         {item.user == props.currentUserId ? <div> <button title="удалить пост" className={s.delete__button } onClick={deletePost}></button>
           <button title="редактировать пост" onClick={editPost}>edit</button>
         </div> : ''}
         
<button title="мне нравится!" className={item.likes.indexOf(props.currentUserId) >= 0 ? s.like__button_active : s.like__button}
          onClick={item.likes.indexOf(props.currentUserId)>=0?likeComment:unlikeComment}></button>    

         
         </div>
        </div>

      

  </div>)
    // <li key={item._id}>{item.username}=>{item.commentBody}</li>)
 })
  //const sendComment = (commentBody)=>props.sendPostComment(props.id,commentBody)\
  //console.log('postLikes index ',props.postLikes.indexOf(props.currentUserId))
  
  return (<div className="blog-card-full">
    
    <img className="blog-card-full-image" src={props.postImageSrc}></img>
    <p className='descrtextfull'>
      <h2>{props.postTitle}</h2>
      {props.postBody}</p>
    
    <p className="read-more">
     
      <div className='horizontal'>
        <button title="мне нравится!" className={props.postLikes.indexOf(props.currentUserId) >= 0 ? s.like__button_active : s.like__button}
          onClick={props.postLikes.indexOf(props.currentUserId)>=0?props.likePostById:props.unlikePostById}></button>    
        {tags}
      </div><span onClick={() => props.ReadMoreFoo()}>Свернуть</span>
    <ul>
      {thisComments}
    </ul>
    
      
    </p>
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
    //console.log('sendUserPost');
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