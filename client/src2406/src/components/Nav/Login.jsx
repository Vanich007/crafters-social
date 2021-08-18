import React, {useState} from 'react';
import {connect} from 'react-redux';
import {userLoginFetch} from '../../reducers/signupReducer';
import {Link} from 'react-router-dom'

function Login({ userLoginFetch,currentUser, ...props}) {
  const [user,setUser]=useState({email: "",password: ""})
 

  const handleChange = event => {
    if (event.target.name === 'email') setUser({ ...user, email: event.target.value })
    else setUser({ ...user, password: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
   
    userLoginFetch({ email: user.email, password: user.password })
    setUser({email: "",password: ""})
  }


    return <>
      <form onSubmit={handleSubmit}>
        <h1>Вход</h1>

        {/* <label>Имя пользователя</label> */}
        <input
          name='email'
          type='email'
          required='required'
          placeholder='Email'
          value={user.email}
          onChange={handleChange}
          /><br/>

        {/* <label>Пароль</label> */}
        <input
          type='password'
          name='password'
          required='required'
          placeholder='Пароль'
          value={user.password}
          onChange={handleChange}
          /><br/>

        <input type='submit'/>
        
      </form>
      <span>Нет аккаунта?</span>
        <Link to='/signup/'>Зарегистрироваться</Link>
      
    </>
}



const mapStateToProps = state => ({
  currentUser: state.signupPage.currentUser
})

export default connect(mapStateToProps, {userLoginFetch})(Login);