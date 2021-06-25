import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../common/Modal'
import s from './Project.module.css';
import AddProjectContainer from './AddProject'


function ProjectItem(props) {
  let { likes, projectTags, projectTitle, projectBody, _id, projectImageSrc, user, date } = props.project 
  
  let currentUserId = props.currentUser._id
  const id = _id
 
   useEffect(() => { props.getSelectedUserProfileByUserId(currentUserId) },[currentUserId])

   const likeFunction=()=>{
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
    let [modalActive,setModalActive]=useState(true)
  let [editProjectState, toggleEditProject] = useState(false)
  let tags = []
  if (projectTags) {
    tags = projectTags.map(item => (<li key={item}>
      <Link to={'/projects/' + item}>  {item}</Link>
    </li>))
  }
  const deleteProject = () => props.deleteProjectById(id)
  let publicName = ''
  if (props.selectedUserProfile) { publicName = props.selectedUserProfile.publicName }
  return (<div className="blog-card">
    
    
       <div className="meta">
            <div className="photo" id={id} style={{backgroundImage:'url('+projectImageSrc+')'}}></div>
      <ul className="details">
        <li className="author"><a href={"/users/"+user}>{publicName}</a></li>
        <li className="date">{date}</li>
        <li className="tags">
          <ul>
            {tags}
          </ul>
        </li>
      </ul>
    </div>
    <div className="description">
      <Link to={'/projects/'+_id }><h2>{projectTitle}</h2></Link>
      
      {user == currentUserId ?
        <div className={s.delete_edit_buttons}>
          
          <button title="удалить проект" className={s.delete__button } onClick={deleteProject}></button>
         {editProjectState ? (<Modal active={modalActive} setActive={setModalActive}
        setFalseAfter={toggleEditProject}>
            <AddProjectContainer /> </Modal>
          ) : <button title="редактировать проект" className={s.edit__button } onClick={ editClick }></button>}
        
        
        </div> : ''}
      
      
             <p className='descrtext'> {projectBody}</p>
      <p className="read-more">
        <button title="мне нравится!" className={likes.indexOf(currentUserId) >= 0 ? s.like__button_active : s.like__button}
          onClick={likeFunction}></button>    
        
          {/* <span onClick={()=>props.ReadMoreFoo()}>Read More</span> */}
            </p>
      
       
            
    </div>

    </div>)
}
// function Full(props) {
//   return (<div className="blog-card-full">
//     <h1>{projectTitle}</h1>
//     <img src={projectImageSrc}></img>
//     <p className='descrtextfull'> {projectBody}</p>
//     <p className="read-more">
//           <span  onClick={()=>props.ReadMoreFoo()}>Свернуть</span>
//             </p>
//      </div>)
// }


export default ProjectItem;