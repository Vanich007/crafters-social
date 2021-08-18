//import React from 'react'
import Login from './Header';
import {selectKlass} from '../../reducers/usersReducer'

import { connect } from 'react-redux'



  


  const mapStateToProps = (state) => {
    return {

      klass:state.usersPage.klass,
      selectedKlass:state.usersPage.selectedKlass,
    
    }
  }
        
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     newUser: () => dispatch(addUserCreateAction()),
  //     typeNewUser: (name) => dispatch(typeUsernameCreateAction(name)),
  //     delUser: (id1) => dispatch(deleteUserCreateAction(id1)),
  //     selectKlass: (id2) => dispatch(selectKlassCreateAction(id2)),
  //     onSelectedUser: (id) => dispatch(selectUserCreateAction(id))
  //   }
  //}
  
const LoginContainer = connect(mapStateToProps, {selectKlass})(Login);




export default LoginContainer;