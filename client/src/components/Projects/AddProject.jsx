import React, {useState} from 'react';
import {connect} from 'react-redux';
//import { userPostFetch } from '../../reducers/signupReducer';
import s from './AddProject.module.css'
import { sendUserPost } from '../../utils/API/connectPosts'
//import ImageUpload from './UploadImage'

export function AddProject (props){
  let [postBodyState, SetPostBodyState] = useState('')
  let [postTitleState, SetPostTitleState] = useState('')

  
  const handleChange = event => {
    switch (event.target.name) {
      case 'postBody': SetPostBodyState(event.target.value); break
       case 'postTitle': SetPostTitleState(event.target.value); break
    }}

  const handleSubmit = event => {
    event.preventDefault()
    console.log('sendUserPost');
    props.sendUserPost({ postBody: postBodyState, postTitle: postTitleState })
    SetPostBodyState('')
    SetPostTitleState('')
  }



  
    return <div className={s.signinform}>
      <form onSubmit={handleSubmit}>
        <h1>Добавить пост:</h1>
        
        
      

        <div className={s.enterdata}>
          
                 <label>Заголовок</label>
        <input
          name='postTitle'
          placeholder='Заголовок'
          value={postTitleState}
          onChange={handleChange}
          />
          </div>
          <div className={s.enterdata}>
          <label>Пост</label>
        <textarea
          name='postBody'
          placeholder='Текст поста...'
          value={postBodyState}
          onChange={handleChange}
          />
          </div >
      
      
        <input type='submit'/>
      </form></div>
    

}

const mapStateToProps = (state) => {
  return {

  }
}
      


const AddProjectContainer = connect(mapStateToProps, {sendUserPost})(AddProject);
export default AddProjectContainer;
