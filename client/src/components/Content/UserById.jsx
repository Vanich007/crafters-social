import React from 'react'
import ShowProfile from './ShowProfile';
import { onSelectedUser } from '../../reducers/usersReducer'
import { follow, unfollow } from '../../utils/API/connectProfile'
import {likePostById,unlikePostById} from '../../utils/API/connectPosts'
import { getSelectedUserProfileByUserId, getSelectedUserPostsByUserId, getSelectedUserPhotoByUserId } from '../../utils/API/connectSelectedProfile'
import {userMessageSend } from '../../utils/API/connectDialogs'
import { getCommentsByPostId,getPostsByUserId ,sendPostComment,likeCommentById,unlikeCommentById} from '../../utils/API/connectPosts'
import {onSelectTag} from '../../reducers/profileReducer'
import { connect } from 'react-redux'
import Post from '../Profile/Post'
import PhotoPreview from './PhotoPreview'


class UserById extends React.PureComponent{
  constructor(props){
    super(props)
    this.sendMessage=false
  }
  sendMessage:false
  componentDidMount() {
     this.props.getSelectedUserProfileByUserId(this.props.selectedUser)
    this.props.getSelectedUserPostsByUserId(this.props.selectedUser)
    this.props.getSelectedUserPhotoByUserId(this.props.selectedUser)
    this.sendMessage=false
    
  }
  
  componentDidUpdate(prevProps) {
    //console.log('selectedUser='+this.props.selectedUserProfile.publicName)
    
    if (this.props.selectedUserProfileId !== prevProps.selectedUserProfileId)
      {
        this.props.getSelectedUserProfileByUserId(this.props.selectedUser)
        this.props.getSelectedUserPostsByUserId(this.props.selectedUser)
        this.props.getSelectedUserPhotoByUserId(this.props.selectedUser)
      }
  }
 
  render() {
    //console.log('this.props.selectedUserPhotos=',this.props.selectedUserPhotos)
    this.userId = this.props.match.params.userId;
    
    //if (this.props.follow.indexOf(this.userId)) {this.props.onFollow(this.userId) }
    this.props.onSelectedUser(this.userId)
        let post=[]
    post = this.props.selectedUserPosts.map(item => {
      // const unlikePost = () => unlikePostById(item._id)
      // const likePost =()=>likePostById(item._id)unlikePostById={this.props.unlikePostById} likePostById={this.props.likePostById} _id={item._id } date={item.date} postBody={item.postBody}
       // postImageSrc={item.postImageSrc} user={this.props.selectedUserProfile.publicName
       return (<li key={item._id}><Post  onClearPost={this.props.onClearPost} 
        unlikePostById={this.props.unlikePostById} likePostById={this.props.likePostById}
        onSetPostTitleBody={this.props.onSetPostTitleBody} onSelectTag={this.props.onSelectTag} 
        onAddPostPhoto={ this.props.onAddPostPhoto} likeCommentById={ this.props.likeCommentById} 
        unlikeCommentById={ this.props.unlikeCommentById} deletePostById={this.props.deletePostById}
          currentUsername={this.props.currentUser.username} 
          postTags={item.postTags} getCommentsByPostId={this.props.getCommentsByPostId} 
          sendPostComment={this.props.sendPostComment} postComments={this.props.postComments} id={item._id}
          date={item.date} postTitle={item.postTitle} postBody={item.postBody}
          userId={item.user} currentUserId={this.props.currentUser._id} postLikes={item.likes}
          postImageSrc={item.postImageSrc} user={this.props.publicName } 
          profileImageSrc={this.props.profileImageSrc}
          onSelectTag={this.props.onSelectTag} sendPostComment={this.props.sendPostComment} 
          likeCommentById={this.props.likeCommentById} 
          unlikeCommentById={this.props.unlikeCommentById}/></li>)
     })
    let userId=this.props.selectedUser?this.props.selectedUser._id:''
   // console.log('this.sendMessage',this.sendMessage)
    return <div><ShowProfile follow={ this.props.follow} unfollow={ this.props.unfollow} selectedUserProfile={this.props.selectedUserProfile} 
    userMessageSend={this.props.userMessageSend} selectedUser={this.props.selectedUser} />
  {/* {this.sendMessage?(<SendMessage  userMessageSend={this.props.userMessageSend} userId={this.props.selectedUser}/>):(
        <button onClick={()=>{this.sendMessage=true}}>Отправить сообщение</button>
      )} */}
      
      <h3>Галлерея пользователя</h3>
      {this.props.selectedUserPhotos.length?<PhotoPreview photos={ this.props.selectedUserPhotos}/>:'Фото не загружены'}
      
    { post }
    </div>
  }
}


 const mapStateToProps = (state) => {
    return {
      selectedUser: state.usersPage.selectedUser,
      selectedUserPhotos: state.usersPage.selectedUserPhotos,
      selectedUserProfile:state.usersPage.selectedUserProfile,
      selectedUserPosts: state.usersPage.selectedUserPosts,
    follow:state.profilePage.follow,
    currentUser: state.signupPage.currentUser
    
    }
  }
        

  
const UserByIdContainer = connect(mapStateToProps, {
  onSelectedUser, getSelectedUserProfileByUserId, getSelectedUserPostsByUserId,
  getSelectedUserPhotoByUserId,userMessageSend,follow,unfollow,unlikePostById,
  likePostById,getCommentsByPostId,onSelectTag,sendPostComment,likeCommentById,unlikeCommentById})(UserById);




export default UserByIdContainer;