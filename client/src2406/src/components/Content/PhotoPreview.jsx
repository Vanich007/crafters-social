import React, {useState,useEffect,useRef} from 'react';
import s from './PhotoPreview.module.css';
import {PhotoItem} from './PhotoItem'





export default function PhotoPreview(props){
  
   let [leftPhotoSlider,setLeftPhotoSlider]=useState(20)
  
  let inputRef = useRef(null)
  let interval1,interval2=null
  useEffect(
    () => {
      
      inputRef.current = document.querySelector(".slider");
      inputRef.current.addEventListener('mouseover', () => {
        clearInterval(interval2);
        interval1 = setInterval(() => { setLeftPhotoSlider(leftPhotoSlider => leftPhotoSlider - 30) }, 300);
      })
      inputRef.current.addEventListener('mouseout', () => {
        clearInterval(interval1);
        interval2 = setInterval(() => { setLeftPhotoSlider(leftPhotoSlider => leftPhotoSlider + 30) }, 300);
        
      })
       return inputRef.current.removeEventListener('mouseover', ()=>{ setLeftPhotoSlider(leftPhotoSlider=>leftPhotoSlider- 30);})
    }
    , [])
  
  useEffect(() => {
    
  if(leftPhotoSlider>10){  clearInterval(interval2)
  }
    if ((leftPhotoSlider > -((props.photos.length - 1) * 222)) && leftPhotoSlider < 10)
    {
      inputRef.current.style.left = leftPhotoSlider + 'px';
      
    }
  
  }, [leftPhotoSlider])
  


    let photos = props.photos.map(item => {
      return <li key={item._id}><PhotoItem 
        photoImageSrc={item.photoImageSrc}/></li>
    })
  
    return (<div className="photopreview">
      <div className="slider">
      {photos}
      </div>
      </div>)
    
}




