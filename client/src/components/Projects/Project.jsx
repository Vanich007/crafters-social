import s from './Post.module.css';
import {useState} from 'react'


function Post(props) {
let [readMoreState,setReadMoreState]=useState(true)
  //let background= `background-image:url('${props.postImageSrc}')`
  let date=props.date
    date = date.substr(0, 10)
    
  function ReadMoreFoo() {
    if (readMoreState) { setReadMoreState(false) } else { setReadMoreState(true) }
  }
  
    return (
      <div>
        
          {readMoreState ? (<ReadMore ReadMoreFoo={() => ReadMoreFoo()} postBody={props.postBody} id={props.id}
            date={ date} postImageSrc={props.postImageSrc} />)
            : (<Full ReadMoreFoo={() => ReadMoreFoo()} postBody={props.postBody} id={props.id}
            date={ date} postImageSrc={props.postImageSrc} />)}  
 
  
  </div>
  );
}
function ReadMore(props) {
  return (<div className="blog-card">
       <div className="meta">
            <div className="photo" id={props.id} style={{backgroundImage:'url('+props.postImageSrc+')'}}></div>
      <ul className="details">
        <li className="author"><a href="#">{props.user}</a></li>
        <li className="date">{props.date}</li>
        <li className="tags">
          <ul>
            <li><a href="#">Learn</a></li>
            <li><a href="#">Code</a></li>
            <li><a href="#">HTML</a></li>
            <li><a href="#">CSS</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div className="description">
      
      
             <p className='descrtext'> {props.postBody}</p>
          <p className="read-more">
          <span onClick={()=>props.ReadMoreFoo()}>Read More</span>
            </p>
           
       
            
    </div>

    </div>)
}
function Full(props) {
  return (<div className="blog-card-full">
    <h1>{props.postTitle}</h1>
    <img src={props.postImageSrc}></img>
    <p className='descrtextfull'> {props.postBody}</p>
    <p className="read-more">
          <span  onClick={()=>props.ReadMoreFoo()}>Свернуть</span>
            </p>
     </div>)
}


export default Post;