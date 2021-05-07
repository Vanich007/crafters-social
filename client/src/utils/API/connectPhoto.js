import { onDeletePhotoById,onGetPhoto} from '../../reducers/profileReducer'

export function userPhotoSend(file) {
  return dispatch => { 
    return fetch("http://localhost:5000/api/photo", {
      method: "POST",
      headers: {
        'Authorization': localStorage.token
      },
      body: file
    })
      .then(resp => resp.json())
      .then(data => {
        //console.log('updProfile data=',data)
        if (data.message) {
          console.error(data.message)
          //Тут прописываем логику
        } else {
          // localStorage.setItem("token", data.jwt)
          dispatch(onGetPhoto(data))
        }
      })
   
  }
}

  export const getPhotoByUserId = userId => {
    return dispatch => {
      let url=  "http://localhost:5000/api/photo/"+userId
      console.log('url='+url)
      return fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
           Accept: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('getPhoto data=',data)
          if (data.message) {
            
            console.error(data.message)
          } else {
            //console.log('returned photos id='+data._id)
           dispatch(onGetPhoto(data))
       
          }
        })
      }
}
  export const deletePhotoById = photoId => {
    return dispatch => {
      let url=  "http://localhost:5000/api/photo/"+photoId
      //console.log('url='+url)
      return fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
           Accept: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('delete data=',data)
          if (data.message='Фото удалено') {
            dispatch(onDeletePhotoById(photoId))
            console.error(data.message)
          } else {
            //console.log('returned photos id='+data._id)
           
       
          }
        })
      }
}
