import s from './Nav.module.css';
import Login from './Login';
import {connect} from 'react-redux';
import { getProfileFetch,userLoginFetch } from '../../reducers/signupReducer';
import { Link } from 'react-router-dom'


function NavSidebar({  currentUser, ...props }) {
  //console.log('current NAV='+currentUser._id)
  if (!currentUser._id)props.getProfileFetch()  
  const GoLogout = ()=>{
    localStorage.removeItem("token")  
    props.getProfileFetch()
     
   ;
  }
  return (
  <div> 
        <ul>
      <li><Link to='/users/'>В ленту</Link></li>
      <li><Link to='/profile/'>Профиль</Link></li>
      <li><Link to='/gallery/'>Галерея</Link></li>
        <li><Link to='/dialogs/'>Диалоги</Link></li>
        <li><Link to='/projects/'>Проекты</Link></li>
    </ul> 
      <div className={(currentUser.username ? s.nodisplay : "")}>
        <Login userLoginFetch={props.userLoginFetch}/>
      </div>
      <div className={(currentUser.username ? "":s.nodisplay )}>
       Пользователь: {currentUser.username}
        <button onClick={GoLogout}>Logout</button></div>
      </div>
  );
}


const mapStateToProps = (state) => {
  return {
    
      currentUser: state.signupPage.currentUser
    }
  }


export default connect(mapStateToProps, {userLoginFetch,getProfileFetch})(NavSidebar);
