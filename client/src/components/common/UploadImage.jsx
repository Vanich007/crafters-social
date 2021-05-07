import React,{useRef,useEffect,useState} from 'react'
import s from './UploadImage.module.css'

const ImageUpload = ({onAddPostPhoto,onAddProfilePhoto,...props }) => {

  let [fileState, setFileState] = useState('')
  let [imagePreviewUrl,setImagePreviewUrl]=useState('')
 
     let inputRef = useRef(null)


   useEffect(() => {
     inputRef.current = document.querySelector('#image_uploads');
    // inputRef.current.addEventListener('change',()=>updateImageDisplay())
     inputRef.current.style.opacity = 0;
     //return inputRef.current.removeEventListener('change',updateImageDisplay)
     if (props.imgSrc) setFileState(props.imgSrc)
     
      setImagePreviewUrl(props.imgSrc)
   }, [])
     
  // function _handleSubmit(e) {
  //   e.preventDefault();
  //   // TODO: do something with -> this.state.file
  //   console.log('handle uploading-', fileState);
  //   
  //   }
  function _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFileState(file)
      setImagePreviewUrl(reader.result)
      
      if(onAddPostPhoto){onAddPostPhoto(file) ; console.log('onAddPostPhoto')      }
      if(onAddProfilePhoto){onAddProfilePhoto(file); console.log('onAddProfilePhoto') }
      // });
    }

    reader.readAsDataURL(file)
  }

  
    
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Картинка не выбрана</div>);
    }

    return (
        <div className={s.previewComponent}>
        <form >
          {/* onSubmit={(e)=>_handleSubmit(e)} */}
  <div >
            <label className={s.button__image_upload} title="Выберите картинку для загрузки (PNG, JPG)" htmlFor="image_uploads"></label>
    <input type="file" id="image_uploads"  name="image_uploads" accept=".jpg, .jpeg, .png" onChange={(e) => _handleImageChange(e)} />
  </div>
           <div className={s.imgPreview}>{$imagePreview}</div>
          {/* {fileState ? (<button //className={s.submitButton}
            type="submit"
            onClick={(e)=>_handleSubmit(e)}>Отправить</button>):''} */}
        </form>
           
          
      </div>
    )
  
}

// ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));
export default ImageUpload