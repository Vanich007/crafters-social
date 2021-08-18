import { onSendMessage,onGetMessages,onGetDialogs,onDeleteMessageById} from '../../reducers/dialogsReducer'

export function userMessageSend(file,userId) {
  return dispatch => { 
    let url= "/api/messages/"+userId
    return fetch(url, {
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
          dispatch(onSendMessage(data))
        }
      })
   
  }
}

  export function getDialogsByUserId  () {    //диалоги по текущему пользователю
    return dispatch => {
      return fetch('/api/dialogs', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.token
       }
      })
        .then(resp => resp.json())
        .then(data => {
          
          if (data.message) {
            
            console.error(data.message)
          } else {
            dispatch(onGetDialogs(data))
          }
        })
      }
}

export function getМessagesByUserId  (targetUserId) {   //сообщения по targetUser
  return dispatch => {
    const url=`/api/messages/?userId=${targetUserId}`
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':localStorage.token
     }
    })
      .then(resp => resp.json())
      .then(data => {
      
        if (data.message) {
          
          console.error(data.message)
        } else {
          dispatch(onGetMessages(data))
        }
      })
    }
}

// export function getMessageByMessageId  (id) {
//   return dispatch => {
//     const url=`/api/messages/?userId=${id}`
//     return fetch(url, {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization':localStorage.token
//      }
//     })
//       .then(resp => resp.json())
//       .then(data => {
       
//         if (data.message) {
          
//           console.error(data.message)
//         } else {
//           dispatch(onGetDialogs(data))
//         }
//       })
//     }
// }   
   
   
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
          
          if (data.message='Сообщение удалено') {
            dispatch(onDeleteMessageById(photoId))
            console.error(data.message)
          } else {
          
           
       
          }
        })
      }
}
