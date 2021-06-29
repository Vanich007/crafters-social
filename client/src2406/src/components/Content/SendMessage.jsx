import React, {useState,useRef,useEffect} from 'react';
import s from './SendMessage.module.css'
import {userMessageSend} from '../../utils/API/connectDialogs'



export default function SendMessage({ userMessageSend, userId }) {
  
  let inputRef = useRef(null)
      let previewRef = useRef(null)
   useEffect(() => {
     inputRef.current = document.querySelector('#image_uploads');
    inputRef.current.addEventListener('change',(e)=>updateImageDisplay(e))
     previewRef.current = document.querySelector('.preview');
     inputRef.current.style.opacity = 0;
     return inputRef.current.removeEventListener('change',updateImageDisplay)
   }
     , [])


  
  let [messageBodyState, setMessageBodyState] = useState('')
  //let [messageImageState, setMessageImageState] = useState('')
  
  function updateImageDisplay(e) {
  while(previewRef.current.firstChild) {
    previewRef.current.removeChild(previewRef.current.firstChild);
  }
  var curFiles = inputRef.current.files;
  if(curFiles.length === 0) {
    var para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    previewRef.current.appendChild(para);
  } else {
    var list = document.createElement('ol');
    previewRef.current.appendChild(list);
    for(var i = 0; i < curFiles.length; i++) {
      var listItem = document.createElement('li');
      //var para = document.createElement('p');
      if(validFileType(curFiles[i])) {
        //para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
        var image = document.createElement('img');
     //   let divImg = document.createElement('div');
        
        image.src = window.URL.createObjectURL(curFiles[i]);
        listItem.appendChild(image);
        //listItem.appendChild(para);
        // listItem.appendChild(divImg);
        // divImg.style.backgroundImage = `url('${window.URL.createObjectURL(curFiles[i])}')`
        // divImg.style.backgroundSize='contain'
        // divImg.style.width = '400px'
        // divImg.style.height = 'auto';   
        // divImg.style.backgroundRepeat = 'no-repeat'
      } else {
        var para = document.createElement('p');
        para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
   }
   var fileTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/png'
]

function validFileType(file) {
  for(var i = 0; i < fileTypes.length; i++) {
    if(file.type === fileTypes[i]) {
      return true;
    }
  }
  return false;
}

// function returnFileSize(number) {
//       if(number < 1024) {
//         return number + 'bytes';
//       } else if(number > 1024 && number < 1048576) {
//         return (number/1024).toFixed(1) + 'KB';
//       } else if(number > 1048576) {
//         return (number/1048576).toFixed(1) + 'MB';
//       }
//    }
  
  const handleChange = event => {
    switch (event.target.name) {
      case 'messageBody': setMessageBodyState(event.target.value); break
     // case 'image_uploads':setMessageImageState(event.target.files[0]); break
    }}

  const handleSubmit = event => {
    event.preventDefault()
    
      const formData = new FormData(); let image: File
      
    if (inputRef.current.files[0]) {
      image = inputRef.current.files[0]
      formData.append('image', image, image.name)
    }
    if (messageBodyState) formData.append('messageBody', messageBodyState)
    
    if (formData)  
      userMessageSend(formData, userId)
    setMessageBodyState('')
  }



  
    return <div className={s.previewComponent}>
             <form method="post" encType="multipart/form-data" onSubmit={(e)=>handleSubmit(e)}>
  <div>
  <label className={s.button__image_upload} title="Выберите картинку для загрузки (PNG, JPG)" htmlFor="image_uploads"></label>
          <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" />
       
  </div>
  <div className="preview">
    
  </div>
  
        
        
        
      

        <div className={s.enterdata}>
        <label>Сообщение</label>
        <textarea
          name='messageBody'
          placeholder='Текст сообщения'
          value={messageBodyState}
          onChange={handleChange}
          />
          </div >
      
      
        <input type='submit'/>
      </form></div>
    

}
