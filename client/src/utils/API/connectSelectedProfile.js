import {onGetSelectedUserPhoto,onGetSelectedUserProfile,onGetSelectedUserPosts} from '../../reducers/usersReducer'

export function loadSelectedProfile(userId) {
  if (userId===undefined) return null
  getSelectedUserProfileByUserId(userId)
  getSelectedUserPostsByUserId(userId)
  getSelectedUserPhotoByUserId(userId)
}
 
  export const getSelectedUserProfileByUserId = userId => {
    return dispatch => {
      if (userId===undefined) return null
      let url=  "http://localhost:5000/api/profile/"+userId
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
          console.log('getProfileByUserId data=',data)
          if (data.message) {
            
            console.error(data.message)
          } else {
            console.log('returned profile id='+data._id)
           dispatch(onGetSelectedUserProfile(data))
           getSelectedUserPostsByUserId(data.user)
          }
        })
      }
}
  
export const getSelectedUserPostsByUserId = userId => {
    return dispatch => {
      let url=  "http://localhost:5000/api/posts/"+userId
      console.log('url='+url)
      return fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.token
       }

      })
        .then(resp => resp.json())
        .then(data => {
          console.log('userPostSend data=',data)
          if (data.message) {
            
            console.error(data.message)
          } else {
           dispatch(onGetSelectedUserPosts(data))
          }
        })
      }
}

  export const getSelectedUserPhotoByUserId = userId => {
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
           dispatch(onGetSelectedUserPhoto(data))
       
          }
        })
      }
}
