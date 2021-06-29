import React, {useState} from 'react';
import {connect} from 'react-redux';
import { userPostFetch } from '../../reducers/signupReducer';
import s from './Signup.module.css'
import {Redirect} from 'react-router-dom'

function Signup (props){
  let [usernameState, SetUsernameState] = useState('')
  let [emailState, SetEmailState] = useState('')
  let [passwordState, SetPasswordState] = useState('')
  
  
  const handleChange = event => {
    switch (event.target.name) {
      case 'username': SetUsernameState(event.target.value); break
      case 'email': SetEmailState(event.target.value); break
      case 'password': SetPasswordState(event.target.value); break
     
    }}
  const handleSubmit = event => {
    event.preventDefault()
    props.userPostFetch({ email: emailState, username: usernameState, password: passwordState })
    SetUsernameState('')
  SetEmailState('')
  SetPasswordState('')
  }

      if (props.currentUser.username) return (
      <Redirect to="/lenta/" />
    ) 
    return (
      <form onSubmit={handleSubmit}>
        <h1>Регистрация нового пользователя</h1>
        
        <div className={s.signinform}>
        
        <div className={s.enterdata}>
        {/* <label>Email</label> */}
        <input
          name='email'
              placeholder='Email'
               type='email'
          required='required'
          value={emailState}
          onChange={handleChange}
          />
          </div >

        <div className={s.enterdata}>
        {/* <label>Имя пользователя</label> */}
        <input
              name='username'
               
          required='required'
          placeholder='Имя пользователя'
          value={usernameState}
          onChange={handleChange}
          />
          </div >
        <div className={s.enterdata}>
        {/* <label>Пароль</label> */}
            <input
               required='required'
          type='password'
          name='password'
          placeholder='Пароль'
          value={passwordState}
          onChange={handleChange}
          /></div>
        

      </div>
        <input type='submit'/>
      </form>
    )
  
}


const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})
const mapStateToProps = state => ({
  currentUser: state.signupPage.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);