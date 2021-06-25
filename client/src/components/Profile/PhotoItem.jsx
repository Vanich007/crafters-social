import s from './PhotoItem.module.css';
import React from 'react'


export default class PhotoItem extends React.PureComponent{
  render = () => { 
    
    let date=this.props.date
    date = date.substr(0, 10)
   //console.log(this.props)
    return (
      <div className={s.wrapper}>  
        <div className={s.photo} >
        <div className={s.date}>{date}</div>  
        
            

      
          
            <img src={this.props.photoImageSrc} className={s.post_img}></img>
        <button title="удалить фото" className={s.delete__button } onClick={()=>this.props.deletePhotoById(this.props.id)}></button>
        <div className={s.comment} >{this.props.photoComment}</div></div>
        
        
          
          
       
      </div>
    
  );
    
  }
}