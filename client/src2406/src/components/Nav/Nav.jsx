import s from './Nav.module.css';
import Login from './Login';
import {connect} from 'react-redux';
import { getProfileFetch,userLoginFetch,logoutUser } from '../../reducers/signupReducer';
import { Link } from 'react-router-dom'


function NavSidebar({  currentUser, ...props }) {
  
  if (!currentUser._id)props.getProfileFetch()  
  const GoLogout = ()=>{
    localStorage.removeItem("token")  
    props.logoutUser()
    props.getProfileFetch()
     
   ;
  }
  return (
  <div className={s.navigation}> 
        <ul>
      <li><Link to='/lenta/'>В ленту</Link></li>
      <li><Link to='/profile/'>Профиль</Link></li>
      <li><Link to='/gallery/'>Галерея</Link></li>
        <li><Link to='/dialogs/'>Диалоги</Link></li>
        <li><Link to='/projects/'>Проекты</Link></li>
        <li><Link to='/search'>Поиск</Link></li>
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


export default connect(mapStateToProps, {userLoginFetch,getProfileFetch,logoutUser})(NavSidebar);
