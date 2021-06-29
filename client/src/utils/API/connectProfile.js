import {onGetProfile,onFollow,onUnfollow} from '../../reducers/profileReducer'
import {onGetSearchedProfiles} from '../../reducers/usersReducer'
import {getPostsByUserId} from './connectPosts'

export function follow(user) {
  return dispatch => {
    let url = "/api/profile/follow/" + user
    return fetch(url, {
      method: "PATCH",
      headers: {
        'Authorization': localStorage.token
      }
      // ,
      // body: file
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          console.error(data.message)
          //Тут прописываем логику
        } else {
          // localStorage.setItem("token", data.jwt)
          dispatch(onFollow(data))
        }
      })
   
  }
}
export function unfollow(user) {
  return dispatch => {
    let url = "/api/profile/unfollow/" + user
    return fetch(url, {
      method: "DELETE",
      headers: {
        'Authorization': localStorage.token
      }
      // ,
      // body: file
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          console.error(data.message)
          //Тут прописываем логику
        } else {
          // localStorage.setItem("token", data.jwt)
          dispatch(onUnfollow(data))
        }
      })
   
  }
}

  export const searchProfileByKeyword = keyword => {
    return dispatch => {
      let url=  "/api/profile/?search="+keyword
      
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
           dispatch(onGetSearchedProfiles(data))
           //getPostsByUserId(data._id)
          }
        })
      }
}

  export const getProfileByUserId = userId => {
    return dispatch => {
      if (!userId||userId==='undefined') return null
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
          if (data.message) {
          } else {
           dispatch(onGetProfile(data))
           //getPostsByUserId(data.user)
          }
        })
      }
}
  

export const updateProfile = (user) => {
    return dispatch => {
      let url=  "/api/profile"
      return fetch(url, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.token
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            
            //Тут прописываем логику
          } else {
           
           dispatch(onGetProfile(data))
          }
        })
      } 
}

export function userProfileSend(file) {
  return dispatch => {
    let url = "/api/profile"
    return fetch(url, {
      method: "PATCH",
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
          dispatch(onGetProfile(data))
        }
      })
   
  }
}