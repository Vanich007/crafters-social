import s from './ShowUsers.module.css';
import React from 'react'
import {Link} from 'react-router-dom'


class ShowUsers extends React.Component{
 
   
  render = () => {
    let profileImageSrc=this.props.profileImageSrc
    return (
      <Link to={process.env.PUBLIC_URL+this.props.userId}><div className={s.userwrapper}>
      <div className={s.user}>
      <div className={s.avatarplace}>       
      <img src={window.location.origin + "/" + (profileImageSrc?profileImageSrc:'uploads/images/guestavatar.gif')} className={s.avatar}></img>
      </div> 
      <span className={s.name} >{this.props.publicName}</span>
      <span className={s.klass}>{this.props.status}</span>
      <span className={s.klass}>{this.props.livingPlace}</span>
      <span className={s.klass}>{this.props.date}</span>
      
        
        </div></div></Link>
    
  );
    
  }
}


export default ShowUsers;