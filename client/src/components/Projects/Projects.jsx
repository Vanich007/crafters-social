import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import s from './Project.module.css';
import { onGetProjects,onAddProject,onDeleteProject ,onSetProjectTitleBody} from '../../reducers/projectsReducer'
import {onSelectTag} from '../../reducers/profileReducer'
import { getProjectByUserId, deleteProjectById, sendUserProject, updateUserProject, unlikeProjectById, likeProjectById } from '../../utils/API/connectProjects'
import { getSelectedUserProfileByUserId } from '../../utils/API/connectSelectedProfile'
import ProjectItem from './ProjectItem'
import AddProjectContainer from './AddProject'
import Modal from '../common/Modal'



const Projects = (props) => {
  useEffect(() => {
    document.title = 'Проекты пользователя '+props.selectedUser + ` на ${process.env.REACT_APP_SITE_TITLE}`
  }, [])

 //postsIsFetching:false
 let [modalActive,setModalActive]=useState(true)
  let [projectsIsFetching,setProjectsIsFetching]=useState(false)
  let [addProjectState,toggleAddProject]=useState(false)
  
  useEffect(() => {
    setProjectsIsFetching(true  )
    if (props.currentUser) props.getProjectByUserId(props.currentUser._id)
   setProjectsIsFetching(false)
  }, [props.currentUser._id])
  
  let projects = []
  if (!projectsIsFetching)
  {
    projects = props.projects.map(item => {
      return <li key={item._id}><ProjectItem selectedUserProfile={props.selectedUserProfile}
          getSelectedUserProfileByUserId={props.getSelectedUserProfileByUserId}
        project={item}
        currentUser={props.currentUser} onSetProjectTitleBody={props.onSetProjectTitleBody}
        deleteProjectById={props.deleteProjectById} unlikeProjectById={props.unlikeProjectById}
        likeProjectById={props.likeProjectById } onSelectTag={props.onSelectTag}
      /></li>
    })
  }
  
    

    return <div><h1>Список проектов:</h1>
      <p>Проекты - это набор постов, обьединенных одной тематикой. Вам больше не нужно собирать материалы, создавая очередное свое творение, чтобы опубликовать полный отчет. Публикуйте сразу очередную фазу проекта с пояснениями, другие пользователи увидят пост и поделятся мнением, советом, подпишутся на проект или Ваши новости.</p>
     {projects}
     {addProjectState ? (<Modal active={modalActive} setActive={setModalActive}
        setFalseAfter={toggleAddProject}>
        <AddProjectContainer /> </Modal>
      ) : <button title="Добавить проект" className={ s.add_project_button} onClick={() => { toggleAddProject(true) }}></button>}
      </div>
    
  
}


 const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser,
      projects: state.projectsPage.projects,
      profileId:state.profilePage.profileId,
      selectedUser: state.usersPage.selectedUser,
      selectedTags:state.projectsPage.selectedTags,
projectBody: state.projectsPage.projectBody,
    projectTitle: state.projectsPage.projectTitle,
    projectPosts:state.projectsPage.projectPosts,
    projectImageSrc: state.projectsPage.projectImageSrc,
      projectId: state.projectsPage.projectId,
    selectedUserProfile:state.usersPage.selectedUserProfile
    }
  }
        

  
const ProjectsContainer = connect(mapStateToProps, {
  onGetProjects, onAddProject, onDeleteProject, getProjectByUserId,
  deleteProjectById, sendUserProject, updateUserProject, onSetProjectTitleBody,
  unlikeProjectById,likeProjectById,onSelectTag,getSelectedUserProfileByUserId
})(Projects);

export default ProjectsContainer;

