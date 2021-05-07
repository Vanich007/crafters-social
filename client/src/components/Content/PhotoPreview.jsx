import React from 'react'
import s from './PhotoPreview.module.css';
import {PhotoItem} from './PhotoItem'





export default class PhotoPreview extends React.PureComponent{
 render() {
    let photos = this.props.photos.map(item => {
      return <li key={item._id}><PhotoItem 
        photoImageSrc={item.photoImageSrc}/></li>
    })
    return (<div className="photopreview">
      
      {photos}
     
      </div>)
    }
}




