import {onGetProfile,onFollow,onUnfollow} from '../../reducers/profileReducer'
import {onGetSearchedProfiles} from '../../reducers/usersReducer'
import {getPostsByUserId} from './connectPosts'

export function follow(user) {
  return dispatch => {
    let url = "http://localhost:5000/api/profile/follow/" + user
    //console.log(file)
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
        console.log('updProfile data=',data)
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
    let url = "http://localhost:5000/api/profile/unfollow/" + user
    //console.log(file)
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
        console.log('updProfile data=',data)
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
      let url=  "http://localhost:5000/api/profile/?search="+keyword
      
      return fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',

           Accept: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('searchProfileByKeyword data=',data)
          if (data.message) {
            
            console.error(data.message)
          } else {
            //console.log('returned profiles id='+data[0]._id)
           dispatch(onGetSearchedProfiles(data))
           //getPostsByUserId(data._id)
          }
        })
      }
}

  export const getProfileByUserId = userId => {
    return dispatch => {
      if (userId===undefined) return null
      let url=  "http://localhost:5000/api/profile/"+userId
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
            console.log('returned profile id='+data._id)
           dispatch(onGetProfile(data))
           getPostsByUserId(data.user)
          }
        })
      }
}
  

export const updateProfile = (user) => {
    return dispatch => {
      let url=  "http://localhost:5000/api/profile"
      //console.log('url='+url)
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
          console.log('updatedProfile data=',data)
          if (data.message) {
            console.error(data.message)
            //Тут прописываем логику
          } else {
           
           dispatch(onGetProfile(data))
          }
        })
      } 
}

export function userProfileSend(file) {
  return dispatch => {
    let url = "http://localhost:5000/api/profile"
    console.log('userProfileSend',file)
    return fetch(url, {
      method: "PATCH",
      headers: {
        'Authorization': localStorage.token
      },
      body: file
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('updProfile data=',data)
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