import React from 'react'
import ReactDOM from 'react'
import s from './UploadImage.module.css'

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    
   userPostSend(this.state.file)
    function userPostSend ( file) {
   
    return fetch("http://localhost:5000/api/profile", {
    method: "POST",
    headers: {
    'Content-Type': 'application/json',
    'Authorization':localStorage.token
    // ,
    // Accept: 'application/json'
    },
    body: file
    })
    .then(resp => resp.json())
    .then(data => {
    
    if (data.message) {
   
    //Тут прописываем логику
    } else {
    // localStorage.setItem("token", data.jwt)
    // dispatch(loginUser(data.user))
    }
    })
   
    }
   
    }
   

  

  render() {


    
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
        <div className={s.previewComponent}>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
                <input className={s.fileInput}
            type="file"
            onChange={(e)=>this._handleImageChange(e)} />
                <button className={s.submitButton}
            type="submit"
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
            <div className={s.imgPreview}>
          {$imagePreview}
        </div>
      </div>
    )
  }
}

// ReactDOM.render(<ImageUpload/>, document.getElementById("mainApp"));