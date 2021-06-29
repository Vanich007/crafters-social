//import React from 'react'
import Users from './Users';

import { getProfileByUserId,searchProfileByKeyword } from '../../utils/API/connectProfile'

import { connect } from 'react-redux'
//import {withRouter} from 'react-router-dom'




  


 const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser,
      users:state.usersPage.users,
      profileId:state.profilePage.profileId
      
    }
  }
        

  
const UsersContainer = connect(mapStateToProps, {
   searchProfileByKeyword
})(Users);




export default UsersContainer;