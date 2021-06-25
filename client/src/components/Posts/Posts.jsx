import React, {useState} from 'react';
import {connect} from 'react-redux';
//import { userPostFetch } from '../../reducers/signupReducer';
import s from './Posts.module.css'

export default function Posts (props){
  let [postBodyState, SetPostBodyState] = useState('')
  // let [emailState, SetEmailState] = useState('')
  // let [passwordState, SetPasswordState] = useState('')
  // let [bioState, SetBioState] = useState('')
  
  const handleChange = event => {
    switch (event.target.name) {
      case 'postBody': SetPostBodyState(event.target.value); break
      // case 'email': SetEmailState(event.target.value); break
      // case 'password': SetPasswordState(event.target.value); break
      // case 'bio': SetBioState(event.target.value); break
    }}
  const handleSubmit = event => {
    event.preventDefault()
    userPostSend({ postBody: postBodyState })
    SetPostBodyState('')
  }

  const userPostSend = user => {
    
      return fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.token
          // ,
          // Accept: 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(data => {
          
          if (data.message) {
            
            //Тут прописываем логику
          } else {
           // localStorage.setItem("token", data.jwt)
           // dispatch(loginUser(data.user))
          }
        })
   
  }

  
    return (
      <form onSubmit={handleSubmit}>
        <h1>Добавить пост:</h1>
        
        <div className={s.signinform}>
        
        {/* <div className={s.enterdata}>
        <label>Email</label>
        <input
          name='email'
          placeholder='Email'
          value={emailState}
          onChange={handleChange}
          />
          </div > */}

        <div className={s.enterdata}>
        <label>Пост</label>
        <input
          name='postBody'
          placeholder='postBody'
          value={postBodyState}
          onChange={handleChange}
          />
          </div >
        {/* <div className={s.enterdata}>
        <label>Пароль</label>
        <input
          type='password'
          name='password'
          placeholder='Пароль'
          value={passwordState}
          onChange={handleChange}
          /></div>
        
            <div className={s.enterdata}>
          <label>Пару слов о себе</label>
          <textarea
            name='bio'
            placeholder='О себе'
            value={bioState}
            onChange={handleChange}
            /></div> */}
      </div>
        <input type='submit'/>
      </form>
    )
  
}


