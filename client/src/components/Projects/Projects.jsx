import React from 'react'
import s from './Project.module.css';
import { onGetPhoto,onDeletePhotoById } from '../../reducers/profileReducer'
import { connect } from 'react-redux'
import { userPhotoSend,getPhotoByUserId } from '../../utils/API/connectPhoto'
import Preloader from '../../utils/preloader'
//import PhotoItem from './PhotoItem'
import AddProjectContainer from './AddProject'



class Projects extends React.PureComponent{
 postsIsFetching:false
  componentDidMount() {
    this.postsIsFetching=true  
    if (this.props.ProfileId) this.props.getPhotoByUserId(this.props.ProfileId)
    this.postsIsFetching=false
  }
  

  render() {
    // console.log('profileId=' + this.props.profileId + 'this.currentUser=' + this.props.currentUser._id)
    
    // let photos = this.props.photos.map(item => {
    //   const deleteItem=onDeletePhotoById(item._id)
    //   return <li key={item._id}><PhotoItem deleteItem={ deleteItem} date={item.date} photoText={item.photoText}
    //     photoImageSrc={item.photoImageSrc} user={item.user} likes={item.likes}/></li>
    // })

    return (<div><h1>Список проектов:</h1>
      <p>Проекты - это набор постов, обьединенных одной тематикой. Вам больше не нужно собирать материалы, создавая очередное свое творение, чтобы опубликовать полный отчет. Публикуйте сразу очередную фазу проекта с пояснениями, другие пользователи увидят пост и поделятся мнением, советом, подпишутся на проект или Ваши новости.</p>
     
     
      </div>)
    }

  
}


 const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser,
      photos: state.profilePage.photos,
      profileId:state.profilePage.profileId
      
    }
  }
        

  
const ProjectsContainer = connect(mapStateToProps, {
   onGetPhoto,userPhotoSend,getPhotoByUserId,onDeletePhotoById
})(Projects);

export default ProjectsContainer;

