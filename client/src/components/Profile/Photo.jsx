import React from 'react'
import s from './Photos.module.css';
import { onAddPosts,onDeletePostById } from '../../reducers/profileReducer'
import {getProfileFetch} from '../../reducers/signupReducer'
import { connect } from 'react-redux'
import { getPostsByUserId,getProfileByUserId } from '../../utils/API/connect'
import Preloader from '../../utils/preloader'

import AddPostContainer from './AddPost'
import ProfileAnketaContainer from './ProfileAnketa'


class Photo extends React.PureComponent{
 postsIsFetching:false
  componentDidMount() {
    // if (!this.props.match.params.userId) {
    this.postsIsFetching=true  
    this.props.getProfileFetch()

    this.postsIsFetching=false
    // } else getPostsByUserId(this.props.match.params.userId)
    
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.currentUser._id)
    if(this.props.currentUser._id!==prevProps.currentUser._id){
      this.props.getProfileByUserId(this.props.currentUser._id) 
      this.props.getPostsByUserId(this.props.currentUser._id) 
    } 
    // if ((this.props.userId !== prevProps.userId)||(this.props.match.params.userId!==prevProps.match.params.userId))
    // {this.props.getProfileByUserId(this.props.currentUser._id) 
    // this.props.getPostsByUserId(this.props.currentUser._id) }
  }

  render() {
    //console.log('profileId='+this.props.profileId)
    let post=[]
    if (!this.postsIsFetching) post = this.props.posts.map(item => {
      return <li key={item.date}><Post date={item.date} postBody={item.postBody}
        postImageSrc={item.postImageSrc} user={item.user }/></li>
    })
    return (<div><h1>Ваша галлерея:</h1>
      <ProfileAnketaContainer />
      <AddPostContainer />
      <ul>{photos}</ul> 
     
      </div>)
    }
    //let klassItem=this.props.klass.find(item => item.id == oneUser.klassId)
    // return <ShowUserInfo aboutMe={oneUser.aboutMe} livingPlace={oneUser.livingPlace}
    //   birthday={oneUser.birthday} avatarUrl={oneUser.avatarUrl} id={this.userId} name={oneUser.name} />
  
}


 const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser,
      photos: state.profilePage.photos,
      postsIsFetching: state.profilePage.postsIsFetching,
      profileIsFetching: state.profilePage.profileIsFetching,
      profileId:state.profilePage.profileId
      
    }
  }
        

  
const ProfileContainer = connect(mapStateToProps, {
   onAddPosts, onDeletePostById,getPostsByUserId,getProfileFetch,getProfileByUserId
})(Profile);

export default ProfileContainer;

