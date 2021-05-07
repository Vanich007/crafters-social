import React,{useRef,useEffect,useState} from 'react'
import { connect } from 'react-redux'
//import ReactDOM from 'react'
import s from './AddPhotoContainer.module.css'
import { userPhotoSend } from '../../utils/API/connectPhoto'
import { onAddPhoto } from '../../reducers/profileReducer'


 function AddPhoto (props) {
   let [gotFiles, setGotFiles] = useState(false)
  let photosComments=[]         //массив комментариев к фото
   let inputRef = useRef(null)
   let inputRef1 = useRef(null)
   let previewRef = useRef(null)
   let inputMass = useRef(null)
   inputMass.current=photosComments
   useEffect(() => {
     inputRef.current = document.querySelector('#image_uploads');
    inputRef.current.addEventListener('change',()=>updateImageDisplay())
     previewRef.current = document.querySelector('.preview');
     inputRef.current.style.opacity = 0;
     return inputRef.current.removeEventListener('change',updateImageDisplay)
   }
     , [])

function updateImageDisplay() {
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
      var para = document.createElement('p');
      if(validFileType(curFiles[i])) {
        setGotFiles(true)
        para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
        var image = document.createElement('img');
        var komment = document.createElement('input');
        komment.setAttribute('placeholder', 'Ваш комментарий к фото')
        komment.setAttribute('name', i)
        komment.setAttribute('id', 'input'+i)
        image.src = window.URL.createObjectURL(curFiles[i]);
        

        inputMass.current= [...inputMass.current, '']
        

        listItem.appendChild(image);
        listItem.appendChild(komment);
        listItem.appendChild(para);
        inputRef1.current = komment
        komment.addEventListener('change',e=>handleChange(e))
        


      } else {
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

function returnFileSize(number) {
      if(number < 1024) {
        return number + 'bytes';
      } else if(number > 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
      } else if(number > 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
      }
   }

 
     const handleChange = event => {
       let n = +event.target.name
       inputMass.current[n]=event.target.value
     
    }
  
   function _handleSubmit(e) {
    e.preventDefault();
        // console.log(`photosComments length =` + inputMass.current.length)   
        // console.log(`photosComments =`+inputMass.current)     
    var curFiles = inputRef.current.files;  
    for (var i = 0; i < curFiles.length; i++) if(validFileType(curFiles[i])) {
      const formData = new FormData(); let image: File
      image = curFiles[i]
      formData.append('image', image, image.name)
      formData.append('photoComment', inputMass.current[i])
      props.userPhotoSend(formData)
     }
     setGotFiles(false)
   }
   
    return (
        <div className={s.previewComponent}>
       <form method="post" encType="multipart/form-data" onSubmit={(e)=>_handleSubmit(e)}>
  <div>
            <label className="btn btn-primary" htmlFor="image_uploads">Выберите картинки для загрузки (PNG, JPG)</label>
    <input type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png" multiple />
  </div>
  <div className="preview">
    <p>Файлы для загрузки не выбраны</p>
  </div>
  <div>
            {gotFiles ? <input type='submit' /> : ''}
  </div>
</form>
      </div>
    )
  
}



const mapStateToProps = (state) => {
    return {
      currentUser: state.signupPage.currentUser,
      
    }
  }
        
 
const AddPhotoContainer = connect(mapStateToProps, {onAddPhoto,userPhotoSend})(AddPhoto);

export default AddPhotoContainer;