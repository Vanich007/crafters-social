import React,{useState,useEffect} from 'react'
import s from './Users.module.css';
import ShowUsers from './ShowUsers';
import {useHistory} from 'react-router-dom'
import querystring  from "querystring"
import ShowUserInfo from './ShowUserInfo'
import { Field, reduxForm } from 'redux-form'
import {Textarea,Input} from '../common/formControls'
import {maxLengthCreator,required} from '../../utils/validators/validators'


export default function Users({ searchProfileByKeyword,users,currentUser,profileId}) {
 
  let [searchStringState, setsearchStringState]=useState('')
   const history=useHistory()
  
   useEffect(()=>{
    const parsed=querystring.parse(history.location.search.substr(1))
    debugger
    setsearchStringState(parsed.username)
     searchProfileByKeyword(parsed.username);
  },[])

const handleChange = event => {
  
  switch (event.target.name) {
    case 'searchString': setsearchStringState(event.target.value); 
    searchProfileByKeyword(event.target.value);
    history.push({
      pathname:'/users',
      search:`?username=${event.target.value}`
    })
    break
  }
}
let usersJsx=users.map(item=>{
  return(<li key={item._id}>
    <ShowUsers profileImageSrc={item
      .profileImageSrc}
      date={item.date}
      status={item.status}
      livingPlace={item.livingPlace}
      publicName={item.publicName} _id={ item._id} userId={item.user}/>
  </li>)

})

  return (
        <div className={s.usersList}>
<h1>Поиск пользователей</h1>
     
      <div className={s.buttons}>
      {/* <label>Имя пользователя</label> */}
        <input
          name='searchString'
          placeholder='Имя пользователя'
          value={searchStringState}
          onChange={handleChange}
        
          />
     <button className={s.search__button} onClick={()=>searchProfileByKeyword(searchStringState) }>Поиск</button>
  
      </div>
      
      <div className={s.userInfo}>
          <ul>{usersJsx}</ul>
        </div>
    </div>);
}
