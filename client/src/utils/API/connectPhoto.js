import { onDeletePhotoById,onGetPhoto} from '../../reducers/profileReducer'

export function userPhotoSend(file) {
  return dispatch => { 
    return fetch("/api/photo", {
      method: "POST",
      headers: {
        'Authorization': localStorage.token
      },
      body: file
    })
      .then(resp => resp.json())
      .then(data => {
        
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
      if (!userId||userId==='undefined') return null
      let url=  `/api/photo/?userId=${userId}`
      
      return fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
           Accept: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            
            console.error(data.message)
          } else {
           dispatch(onGetPhoto(data))
       
          }
        })
      }
}
  export const deletePhotoById = photoId => {
    return dispatch => {
      let url=  "/api/photo/"+photoId
      return fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
           Accept: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            
            console.error(data.message)
          } else {
           dispatch(onDeletePhotoById(data.deleted))
       
          }
        })
      }
}
