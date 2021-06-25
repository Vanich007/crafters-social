import React, {useState} from 'react';
import {connect} from 'react-redux';
import { onAddPostPhoto,onSelectTag,onClearPost } from '../../reducers/profileReducer';
import s from './AddPost.module.css'
import { sendUserPost,updateUserPost } from '../../utils/API/connectPosts'
import {searchTagsBySubstring,saveTag} from '../../utils/API/connectTags'
//import Modal from '../common/Modal'
import PostImageUpload from '../common/UploadImage'
import Modal from '../common/Modal'

export function AddPost(props) {

  
  let [changePostImage,togglePostImage]=useState(false)
  let [modalActive, setModalActive] = useState(true)
  let [insertTagState, setInsertTag] = useState(false)
   
  let [postBodyState, SetPostBodyState] = useState('')
  
  let [postTitleState, SetPostTitleState] = useState('')
  useState(() => {
    if (props.postTitle && props.postTitle !== postTitleState) SetPostTitleState(props.postTitle)
    if (props.postBody && props.postBody !== postBodyState) SetPostBodyState(props.postBody)
  },[])
  
  const handleChange = event => {
    switch (event.target.name) {
      case 'postBody': SetPostBodyState(event.target.value); break
      case 'postTitle': SetPostTitleState(event.target.value); break
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
   

    const formData = new FormData(); 
    
    if(props.postImageSrc)
    {let image: File
    image = props.postImageSrc
    formData.append('image', image, image.name)
  }
  const tags=props.selectedTags
    formData.append('postBody', postBodyState)
    formData.append('postTitle', postTitleState)
    formData.append('postTags', tags.join('|'))
   
    if (props.postId) { props.updateUserPost(props.postId, formData) }
    else { props.sendUserPost(formData) }
    
    setInsertTag(false)
    SetPostBodyState('')
    SetPostTitleState('')
    togglePostImage('')
    props.onClearPost()
  }

  const tags = props.selectedTags.map(item => (<li>{item}</li>))

    
   
    
  return <div className={s.signinform}>

    <form onSubmit={handleSubmit}>
      
      
      {/* {changePostImage ? (<Modal active={modalActive} setActive={setModalActive} setFalseAfter={togglePostImage}>
        <ImageUpload onAddPostPhoto={props.onAddPostPhoto} />
        </Modal>
      ) : (
        <button onClick={() => togglePostImage(!changePostImage)}>Изменить картинку</button>
      )} */}
  <div className="horizontal">
      {props.postId ? <h1>Исправить пост:</h1> : <h1>Добавить пост:</h1>}
      {props.selectedTags.length > 1 ?<input value="Опубликовать" title="Опубликовать пост" className="publish__button" onSubmit={handleSubmit} type='submit' /> : ''}
      </div>
      <div className="horizontal">

      <div>
            <PostImageUpload imgSrc={props.postImageSrc} onAddPostPhoto={props.onAddPostPhoto} />
        
       </div> 
        
<div>
      <div className={s.enterdata}>
          <div className="vertical">
        <label>Заголовок</label>
        <input
          name='postTitle'
          placeholder='Заголовок'
          required='required'
          value={postTitleState}
          onChange={handleChange}
              />
              </div>
          </div>
        </div>
        </div >
      <div className={s.enterdata}>
        
        <textarea
          name='postBody'
          required='required'
          placeholder='Текст поста...'
          value={postBodyState}
          // className={s.tarea}
          onChange={handleChange}
        />
        </div >
        
     
      <label>Добавьте минимум два тэга:</label>
      <div className="down_buttons">
      <div className={ s.tags}>{tags}
        {insertTagState ? (
        <InsertTag tags={props.tags} saveTag={props.saveTag} 
        onSelectTag={props.onSelectTag} selectedTags={props.selectedTags }/>
       
      ) : (
            <button className="add__button" title="Добавить тэги" onClick={()=>{setInsertTag(true)}}></button>
      )}
    </div>
        
         
      </div>
    </form></div>
}

const InsertTag = (props) => {
   let [tagState, SetTagState] = useState('')
  
  const handleChange = event => {
    switch (event.target.name) {
      case 'postTag': SetTagState(event.target.value); searchTagsBySubstring(event.target.value);break
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    
const tags=props.tags.filter((item)=>item===tagState)
    if (tags.length) { props.onSelectTag(tags[0]) }
    else {
      const formData = new FormData(); 
      formData.append('tagBody', tagState)
     
      props.saveTag(formData)
      props.onSelectTag(tagState)
    }
    SetTagState('')
    
  }

    let tags = props.tags.map((item) => <option  key={item} value={item}></option>)
  //let newUserKlassElement=React.createRef();
  
  return (
    < form onSubmit = { handleSubmit } >
      <input
        name='postTag'
        type='text'
        list='tags'
          placeholder='Введите тэг'
          value={tagState}
        onChange={handleChange}
        onSubmit = { handleSubmit }
      />
      <datalist id='tags'>
        {tags}
      </datalist>
         <input type='submit' value='Добавить' onClick = { handleSubmit } />
      
  </form>
  )
}

const mapStateToProps = (state) => {
  return {
    tags:state.tagsPage.tags,
    selectedTags:state.profilePage.selectedTags,
    postImageSrc: state.profilePage.postImageSrc,
    postBody: state.profilePage.postBody,
    postTitle: state.profilePage.postTitle,
    postId:state.profilePage.postId
  }
}
      


const AddPostContainer = connect(mapStateToProps, {updateUserPost,onClearPost,onAddPostPhoto,saveTag,onSelectTag,
  sendUserPost,searchTagsBySubstring})(AddPost);
export default AddPostContainer;
