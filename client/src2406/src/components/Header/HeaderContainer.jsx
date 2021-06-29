//import React from 'react'
import Header from './Header';
import { getProfileFetch,userLoginFetch } from '../../reducers/signupReducer';

import { connect } from 'react-redux'



  


  const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser
    }
  }
        
 
  
const UsersContainer = connect(mapStateToProps, {userLoginFetch,getProfileFetch})(Header);




export default UsersContainer;