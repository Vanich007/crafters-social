import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { onAddProjectPhoto,onSelectProjectTag,onClearProject,onSelectProjectPost,onClearSelectProjectPost } from '../../reducers/projectsReducer';
import s from './AddProject.module.css'
import { sendUserProject,updateUserProject } from '../../utils/API/connectProjects'
import { searchTagsBySubstring, saveTag } from '../../utils/API/connectTags'
import {searchPostsByKeyword} from '../../utils/API/connectPosts'
//import Modal from '../common/Modal'
import ProjectImageUpload from '../common/UploadImage'
import Modal from '../common/Modal'

export function AddProject(props) {

  useEffect(() => {
    if (props.projectBody && props.projectBody !== projectBodyState)
      SetProjectBodyState(props.projectBody)
  }, [props.projectBody])

  useEffect(() => {
    if (props.projectTitle && props.projectTitle !== projectTitleState)
      SetProjectTitleState(props.projectTitle)
  }, [props.projectTitle])

  let [changeProjectImage, toggleProjectImage] = useState(false)
  let [modalActive, setModalActive] = useState(true)
  let [insertTagState, setInsertTag] = useState(false)
  let [insertPostState, setInsertPost] = useState(false)
   
  let [projectBodyState, SetProjectBodyState] = useState('')
  
  let [projectTitleState, SetProjectTitleState] = useState('')
  

  
  const handleChange = event => {
    switch (event.target.name) {
      case 'projectBody': SetProjectBodyState(event.target.value); break
      case 'projectTitle': SetProjectTitleState(event.target.value); break
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    

    const formData = new FormData(); 
    
    if(props.projectImageSrc)
    {let image: File
    image = props.projectImageSrc
    formData.append('image', image, image.name)
  }
  const tags=props.selectedTags
  const posts=props.selectedPosts.map(item=>item._id)
    formData.append('projectBody', projectBodyState)
    formData.append('projectTitle', projectTitleState)
    formData.append('projectTags', tags.join('|'))
    formData.append('projectPosts', posts.join('|'))
    if (props.projectId) { props.updateUserProject(props.projectId, formData) }
    else { props.sendUserProject(formData) }
    setInsertPost(false)
    setInsertTag(false)
    SetProjectBodyState('')
    SetProjectTitleState('')
    toggleProjectImage('')
    props.onClearSelectProjectPost()
    props.onClearProject()
  }

  const tags = props.selectedTags.map(item => (<li>{item}</li>))
  const selectedPosts = props.selectedPosts.map(item => (<li key={item._id}>{item.postTitle}</li>))
    
   
    
  return <div className={s.signinform}>

    <form onSubmit={handleSubmit}>
      
  <div className="horizontal">
      {props.projectId ? <h1>Редактирование проекта</h1> : <h1>Новый проект:</h1>}
      {props.selectedTags.length > 1 ?<input value="Опубликовать" title="Опубликовать проект" className="publish__button" onSubmit={handleSubmit} type='submit' /> : ''}
      </div>
      <div className="horizontal">

      <div>
         
            <ProjectImageUpload imgSrc={props.projectImageSrc} onAddProjectPhoto={props.onAddProjectPhoto} />
        
       </div> 
        
<div>
      <div className={s.enterdata}>
          <div className="vertical">
        <label>Название проекта</label>
        <input
          name='projectTitle'
          placeholder='Заголовок'
          required='required'
          value={projectTitleState}
          onChange={handleChange}
              />
              </div>
          </div>
        </div>
        </div >
      <div className={s.enterdata}>
        
        <textarea
          name='projectBody'
          required='required'
          placeholder='Текст поста...'
          value={projectBodyState}
          // className={s.tarea}
          onChange={handleChange}
        />
        </div >
        
     
      <label>Добавьте минимум два тэга:</label>
      <div className="down_buttons">
      <div className={ s.tags}>{tags}
          {insertTagState ? (
            <InsertTag  tags={props.tags} saveTag={props.saveTag} 
        onSelectTag={props.onSelectProjectTag} selectedTags={props.selectedTags }
        />
       
      ) : (
              <button className="add__button" title="Добавить тэги" onClick={()=>{setInsertTag(true)}}></button>
      )}
    </div>
        
         
      </div>
       <label>Если посты для проекта уже опубликованы, добавьте их здесь::</label>
      <div className="down_buttons">
      <div className={ s.posts}>{selectedPosts}
        {insertPostState ? (
        <InsertPosts searchedPosts={props.searchedPosts} onSelectProjectPost={props.onSelectProjectPost}
         selectedPosts={props.selectedPosts} currentUser={props.currentUser} 
         searchPostsByKeyword={props.searchPostsByKeyword}/>
       
      ) : (
            <button className={s.add__post_button} title="Добавить посты" onClick={()=>{setInsertPost(true)}}></button>
      )}
    </div>
        
         
      </div>
    </form></div>
}

const InsertTag = (props) => {
   let [tagState, SetTagState] = useState('')
  
  const handleChange = event => {
    switch (event.target.name) {
      case 'projectTag': SetTagState(event.target.value); searchTagsBySubstring(event.target.value);break
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    
const tags=props.tags.filter((item)=>item===tagState)

    if (tags.length) { if (props.selectedTags.indexOf(tagState) === -1) { props.onSelectTag(tags[0]) }}
    else {props.saveTag(tagState)
      
    }
    SetTagState('')
    
  }

    let tags = props.tags.map((item) => <option key={item} value={item}></option>)
  //let newUserKlassElement=React.createRef();
  
  return (
    < form onSubmit = { handleSubmit } >
      <input
        name='projectTag'
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



      
const InsertPosts = (props) => {
   let [postState, setPostState] = useState('')
  
  const handleChange = event => {
    switch (event.target.name) {
      case 'projectPost': setPostState(event.target.value);
        
      props.searchPostsByKeyword(event.target.value, props.currentUser._id); break
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    
    const sPosts = props.searchedPosts.filter((item) => item.postTitle === postState)
    const selectedPostsId= props.selectedPosts.map(item=>item._id)
    if (sPosts.length) {
      if (selectedPostsId.indexOf(sPosts[0]._id) === -1) { props.onSelectProjectPost(sPosts[0]) }
    }
    
    setPostState('')  
    }
    
    
  

  let searchesPosts = props.searchedPosts.map((item) => <option key={item._id} value={item.postTitle}></option>)
  console.log(searchesPosts)
  //let newUserKlassElement=React.createRef();
  
  return (
    < form onSubmit = { handleSubmit } >
      <input
        name='projectPost'
        type='text'
        list='posts'
          placeholder='Начните вводить название поста'
          value={postState}
        onChange={handleChange}
        onSubmit = { handleSubmit }
      />
      <datalist id='posts'>
        {searchesPosts}
      </datalist>
      <input  type='submit' value='Добавить' onClick = { handleSubmit } />
      
  </form>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.signupPage.currentUser,
    tags: state.tagsPage.tags,
    selectedTags:state.projectsPage.selectedTags,
    projectImageSrc: state.projectsPage.projectImageSrc,
    projectBody: state.projectsPage.projectBody,
    projectTitle: state.projectsPage.projectTitle,
    projectId: state.projectsPage.projectId,
    searchedPosts: state.profilePage.searchedPosts,
    selectedPosts:state.projectsPage.selectedPosts,
  }
}
const AddProjectContainer = connect(mapStateToProps, {updateUserProject,onClearProject,onAddProjectPhoto,
  saveTag,onSelectProjectTag,searchPostsByKeyword,onClearSelectProjectPost,
  sendUserProject,searchTagsBySubstring,onSelectProjectPost})(AddProject);

export default AddProjectContainer;
