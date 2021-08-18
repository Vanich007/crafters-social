import React from 'react'
import s from './Photos.module.css';
import { connect } from 'react-redux'
import { onGetPhoto } from '../../reducers/profileReducer'
import { userPhotoSend,getPhotoByUserId,deletePhotoById } from '../../utils/API/connectPhoto'
import Preloader from '../../utils/preloader'
import PhotoItem from './PhotoItem'
import AddPhotoContainer from './AddPhotoContainer'



class Photos extends React.Component{
  postsIsFetching: false
  
  
  
  componentDidMount() {
    this.postsIsFetching=true  
    if (this.props.currentUser._id) this.props.getPhotoByUserId(this.props.currentUser._id)
      document.title = 'Галерея пользователя' + ` на ${process.env.REACT_APP_SITE_TITLE}`
    this.postsIsFetching=false
  }
  componentDidUpdate(prevProps){
    if((this.props.currentUser!==prevProps.currentUser)&& this.props.currentUser._id)
    {
    this.postsIsFetching=true  
    if (this.props.currentUser._id) this.props.getPhotoByUserId(this.props.currentUser._id)
    this.postsIsFetching=false
    }
  }
  

  render() {
    
    console.log('this.props',this.props)
    let photos = this.props.photos.map(item => {
      //const deleteItem=this.props.deletePhotoById(item._id)
      let comment=''
      if(item.photoComment!=='undefined'){comment=item.photoComment}
      return <li key={item._id}><PhotoItem deletePhotoById={ this.props.deletePhotoById} date={item.date} 
      photoComment={comment} id={item._id}
        photoImageSrc={item.photoImageSrc} user={item.user} likes={item.likes}/></li>
    })
    
    return (<div><h1>Загруженные фото:</h1>
      <AddPhotoContainer />
      {/* <AddPhotoContainer /> */}
      <ul>{photos}</ul> 
     
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
        

  
const PhotoContainer = connect(mapStateToProps, {
   onGetPhoto,userPhotoSend,getPhotoByUserId,deletePhotoById
})(Photos);

export default PhotoContainer;

