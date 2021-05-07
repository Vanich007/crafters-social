import { onSendMessage,onGetMessages,onGetDialogs,onDeleteMessageById} from '../../reducers/dialogsReducer'

export function userMessageSend(file,userId) {
  return dispatch => { 
    let url= "http://localhost:5000/api/messages/"+userId
    return fetch(url, {
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
          dispatch(onSendMessage(data))
        }
      })
   
  }
}

  export function getDialogsByUserId  () {    //диалоги по текущему пользователю
    return dispatch => {
      return fetch('http://localhost:5000/api/dialogs', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.token
       }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('getDialogsByUserId data=',data)
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
    const url='http://localhost:5000/api/messages/'+targetUserId
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':localStorage.token
     }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('getMessagesByUserId data=',data)
        if (data.message) {
          
          console.error(data.message)
        } else {
          dispatch(onGetMessages(data))
        }
      })
    }
}

export function getMessageByMessageId  (id) {
  return dispatch => {
    const url='http://localhost:5000/api/messages/'+id
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization':localStorage.token
     }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('getMessageByMessageId data=',data)
        if (data.message) {
          
          console.error(data.message)
        } else {
          dispatch(onGetDialogs(data))
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
          if (data.message='Сообщение удалено') {
            dispatch(onDeleteMessageById(photoId))
            console.error(data.message)
          } else {
            //console.log('returned photos id='+data._id)
           
       
          }
        })
      }
}
