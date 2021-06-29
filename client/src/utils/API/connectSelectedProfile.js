import {onGetSelectedUserPhoto,onGetSelectedUserProfile,onGetSelectedUserPosts} from '../../reducers/usersReducer'

export function loadSelectedProfile(userId) {
  if (userId===undefined) return null
  getSelectedUserProfileByUserId(userId)
  getSelectedUserPostsByUserId(userId)
  getSelectedUserPhotoByUserId(userId)
}
 
  export const getSelectedUserProfileByUserId = userId => {
    return dispatch => {
      if (userId===undefined||userId===null) return null
      let url=  "/api/profile/"+userId
      return fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',

           Accept: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if(!data)return null
          if (data.message) {
            
            console.error(data.message)
          } else {
           dispatch(onGetSelectedUserProfile(data))
           getSelectedUserPostsByUserId(data.user)
          }
        })
      }
}
  
export const getSelectedUserPostsByUserId = userId => {
    return dispatch => {
      let url=  `/api/posts/?userId=${userId}&limit=50&offset=0`
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
           dispatch(onGetSelectedUserPosts(data))
          }
        })
      }
}

  export const getSelectedUserPhotoByUserId = userId => {
    return dispatch => {
      let url=   `/api/photo/?userId=${userId}`
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
           dispatch(onGetSelectedUserPhoto(data))
       
          }
        })
      }
}
