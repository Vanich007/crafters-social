import React, {useState} from 'react';
import {connect} from 'react-redux';
import { onAddPostPhoto } from '../../reducers/profileReducer';
import s from './AddPost.module.css'
import { sendUserPost } from '../../utils/API/connectPosts'
import {searchTagsBySubstring,saveTag} from '../../utils/API/connectTags'
import {onSelectTag} from '../../reducers/tagsReducer'
//import Modal from '../common/Modal'
import ImageUpload from '../common/UploadImage'

export function EditPost(props) {
  console.log(props.selectedTags)
  let [modalActive, setModalActive] = useState(true)
  let [insertTagState, setInsertTag] = useState(false)
   
  let [postBodyState, SetPostBodyState] = useState('')
  let [postTitleState, SetPostTitleState] = useState('')
 

  
  const handleChange = event => {
    switch (event.target.name) {
      case 'postBody': SetPostBodyState(event.target.value); break
      case 'postTitle': SetPostTitleState(event.target.value); break
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    //console.log('sendUserPost');
    //props.sendUserPost({ : , :  })

    const formData = new FormData(); 
    if(props.postImageSrc)
    {let image: File
    image = props.postImageSrc
    formData.append('image', image, image.name)
  }
  const tags=props.selectedTags.map(item=>item.tagBody)
    formData.append('postBody', postBodyState)
    formData.append('postTitle', postTitleState)
    formData.append('postTags', tags.join('|'))
    props.sendUserPost(formData)
    setInsertTag(false)
    SetPostBodyState('')
    SetPostTitleState('')
  }

  const tags = props.selectedTags.map(item => (<li>{item.tagBody}</li>))

    
   
    
  return <div className={s.signinform}>

    <form onSubmit={handleSubmit}>
      <ImageUpload onAddPostPhoto={ props.onAddPostPhoto}/>
      <h1>Добавить пост:</h1>
      {/* {changeAvatar?(<UploadImage userProfileSend={userProfileSend} profileId={profileId} currentUser={currentUser} status={ statusState}
      livingPlace={livingPlaceState} 
      publicName={publicNameState} />):''}

    {(profileImageSrc)?<img src={profileImageSrc}></img>:''}
    <button onClick={()=>toggleChangeAvatar(!changeAvatar)}>Добавить картинку</button>
        
       */}

      <div className={s.enterdata}>
          
        <label>Заголовок</label>
        <input
          name='postTitle'
          placeholder='Заголовок'
          required='required'
          value={postTitleState}
          onChange={handleChange}
        />
      </div>
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
      <label>Добавьте минимум два тэга:</label><div className={ s.tags}>{tags}</div>
      {/* <Modal active={modalActive} setActive={setModalActive} setFalseAfter={setInsertTag}>  </Modal>*/}
         {insertTagState ? (
        <InsertTag tags={props.tags} saveTag={props.saveTag} onSelectTag={props.onSelectTag} selectedTags={props.selectedTags }/>
       
      ) : (
        <button onClick={()=>{setInsertTag(true)}}>Добавить тэги</button>
      )}
    
      {props.selectedTags.length > 1 ? <input onSubmit={handleSubmit} type='submit' /> : ''}
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
    //console.log('sendUserTags');
const tags=props.tags.filter((item)=>item.tagBody===tagState)
    if (tags.length) { props.onSelectTag(tags[0]) }
    else {props.saveTag(tagState)
      
    }
    SetTagState('')
    
  }

    let tags = props.tags.map((item) => <option  key={item._id} value={item.tagBody}></option>)
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
    selectedTags: state.tagsPage.selectedTags,
    postImageSrc:state.profilePage.postImageSrc
  }
}
      


const EditPostContainer = connect(mapStateToProps, {onAddPostPhoto,saveTag,onSelectTag,sendUserPost,searchTagsBySubstring})(EditPost);
export default EditPostContainer;
