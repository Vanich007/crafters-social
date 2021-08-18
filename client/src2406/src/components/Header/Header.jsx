import React from 'react'
import { Link } from 'react-router-dom'
// import Login from '../Nav/Login';


function Header({  currentUser, ...props }) {
  const GoLogout = ()=>{
    localStorage.removeItem("token")  
    props.getProfileFetch()
  }
  return (<>
      <header id="header">
      <div className="container">
        
        <a href="/" id="logo">
          <h1>CraftTerritory</h1></a>
        
          <div className="btn-toolbar btn-group-sm pull-right">
            
            
            
            {/* <a href="http://szfo.sed.mvd.ru" className="btn btn-primary preloader-link" title="Рабочее место делопроизводителя">
              <span className="glyphicon glyphicon-share-alt"></span>
</a>
            <a href="/" className="btn btn-primary preloader-link" data-remote="true" title="Домой">
              <span className="glyphicon glyphicon-home"></span>
</a>
            <a href="/documents?is_registered=true" className="btn btn-primary preloader-link" data-remote="true" title="Зарегистрированные">
              <span className="glyphicon glyphicon-align-justify"></span>
</a>
            <a href="/documents?folder_id=56eaa1608e8500000a000001" className="btn btn-primary preloader-link" data-remote="true" title="Избранное">
              <span className="glyphicon glyphicon-star"></span>
</a>
            <a href="/documents?folder_id=56eaa1608e8500000b000001" className="btn btn-primary preloader-link" data-remote="true" title="Обработанные">
              <span className="glyphicon glyphicon-wrench"></span>
</a>
            <a href="/documents?on_route=true" className="btn btn-primary preloader-link" data-remote="true" title="Отправленные по маршруту">
              <span className="glyphicon glyphicon-sort"></span>
</a>
            <a href="/activities" className="btn btn-primary preloader-link" data-remote="true" title="Активность профиля">
              <span className="glyphicon glyphicon-time"></span>
</a>
            <a href="/events" className="btn btn-primary preloader-link" data-remote="true" id="events_button" title="Календарь событий">
              <span className="glyphicon glyphicon-calendar"></span>
</a>
            <a href="/settings" className="btn btn-primary preloader-link" data-remote="true" title="Настройки">
              <span className="glyphicon glyphicon-cog"></span>
</a>           */}
            <div className="btn-group btn-group-sm">
              <a href={process.env.PUBLIC_URL+'users/'+currentUser._id} className="btn btn-primary" data-method="put" data-remote="true" data-toggle="dropdown" rel="nofollow">
              {/* <div className={(currentUser.username ? s.nodisplay : "")}>
        <Login userLoginFetch={props.userLoginFetch}/>
      </div> */}
      <div className={(currentUser.username ? "":'nodisplay' )}>
       Пользователь: {currentUser.username}
        <button onClick={GoLogout}>Logout</button></div>
                
</a>           
              {/* <a href="/common/saml/destroy_session" className="btn btn-primary" data-method="post" rel="nofollow"><span className="glyphicon glyphicon-log-out" title="Выход"></span></a> */}
            </div>

          </div>

        

        {/* <a href="#nav" className="btn btn-primary btn-sm pull-right collapsed" data-toggle="collapse"><span className="glyphicon glyphicon-menu-hamburger"></span></a> */}
 
      </div>
 

    </header>
     <div className="menu-container">
  <nav>
    <ul>
      <li><Link to='/lenta/'>Лента</Link></li>
      <li><Link to='/profile/'>Профиль</Link></li>
      <li><Link to='/gallery/'>Галерея</Link></li>
      <li><Link to='/users/'>Пользователи</Link></li>
    </ul>
  </nav>
</div>
    </>
  );
}

export default Header;