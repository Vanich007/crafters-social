import s from './Post.module.css';
import React from 'react'


export default class PhotoItem extends React.PureComponent{
  render = () => { 
    
    let date=this.props.date
    date = date.substr(0, 10)
   
    return (
      <div className={s.wrapper}>  
        <div className={s.date}>{date}</div>  
        <div className={s.photo} >
            
      {/* <img src={(profileImageSrc?profileImageSrc:'uploads/images/guestavatar.gif')} className={s.avatar}></img> */}
      
          <img src={window.location.origin + "/" + this.props.photoImageSrc} className={s.post_img}></img></div>
        
        <button title="удалить фото" className={s.delete__button } onClick={this.props.deleteItem}></button>
          
          <div className={s.post_body} >{this.props.photoComment}</div>
       
      </div>
    
  );
    
  }
}