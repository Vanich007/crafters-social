import s from './PhotoItem.module.css';
import React from 'react'


export class PhotoItem extends React.PureComponent{
  render = () => {
    
    const divStyle = {
      color: 'blue',
      backgroundImage: 'url(' + window.location.origin + "/" +this.props.photoImageSrc + ')',
    };
    
    
    return <div className={s.wrapper}>  
      <div className={s.date}>{this.props.date}</div>  
      <div className={s.photo} >

        <img src={window.location.origin + "/" + this.props.photoImageSrc} className={s.prew_img}></img>
           <div style={divStyle}> 
     </div></div>
        <div className={s.post_body} >{this.props.photoComment}</div>
     
    </div>
 
  }
}