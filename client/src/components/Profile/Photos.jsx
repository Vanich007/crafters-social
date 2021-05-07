import React from 'react'
import s from './Photos.module.css';
import { onGetPhoto,onDeletePhotoById } from '../../reducers/profileReducer'
import { connect } from 'react-redux'
import { userPhotoSend,getPhotoByUserId } from '../../utils/API/connectPhoto'
import Preloader from '../../utils/preloader'
import PhotoItem from './PhotoItem'
import AddPhotoContainer from './AddPhotoContainer'



class Photos extends React.Component{
 postsIsFetching:false
  componentDidMount() {
    this.postsIsFetching=true  
    if (this.props.currentUser._id) this.props.getPhotoByUserId(this.props.currentUser._id)
    this.postsIsFetching=false
  }
  componentDidUpdate(prevProps){
    if(this.props.currentUser!==prevProps.currentUser)
    {
    this.postsIsFetching=true  
    if (this.props.currentUser._id) this.props.getPhotoByUserId(this.props.currentUser._id)
    this.postsIsFetching=false
    }
  }
  

  render() {
    
    
    let photos = this.props.photos.map(item => {
      const deleteItem=onDeletePhotoById(item._id)
      let comment=''
      if(item.photoComment!=='undefined'){comment=item.photoComment}
      return <li key={item._id}><PhotoItem deleteItem={ deleteItem} date={item.date} 
      photoComment={comment}
        photoImageSrc={item.photoImageSrc} user={item.user} likes={item.likes}/></li>
    })
    //console.log('profileId=' + this.props.profileId + 'this.currentUser=' + this.props.currentUser._id,photos)
    return (<div><h1>Загруженные фото:</h1>
      {this.props.ProfileId === this.props.currentUser ? (<AddPhotoContainer />) : ('')}
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
   onGetPhoto,userPhotoSend,getPhotoByUserId,onDeletePhotoById
})(Photos);

export default PhotoContainer;

