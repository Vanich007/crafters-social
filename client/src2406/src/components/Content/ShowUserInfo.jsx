import s from './ShowUserInfo.module.css';
import React from 'react'


class ShowUserInfo extends React.Component{
  
  
   
  render = () => {
    return (
      <div className={s.wrapper}>
        <h1>Анкета учащегося:</h1>
         <div className={s.klass}><div className={s.label}>Ссылка на профиль:</div><div className={s.znach}><a href={process.env.PUBLIC_URL + '/users/' + this.props.id}>Перейти</a></div></div>
        <div className={s.user}>
          <div className={s.photo} ><img src={this.props.avatarUrl} className={s.avatar}></img></div>
          <div className={s.name} ><div className={s.label}>Имя</div><div className={s.znach}>{this.props.name}</div></div>
          <div className={s.name} ><div className={s.label}>Дата рождения</div><div className={s.znach}>{this.props.birthday}</div></div>
          <div className={s.name} ><div className={s.label}>Место жительства</div><div className={s.znach}>{this.props.livingPlace}</div></div>
          <div className={s.name} ><div className={s.label}>Обо мне</div><div className={s.znach}>{this.props.aboutMe}</div></div>
         
         
          
       </div> 
      </div>
    
  );
    
  }
}


export default ShowUserInfo;