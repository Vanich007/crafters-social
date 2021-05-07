import { onGetSearchedTags, onAddTag } from '../../reducers/tagsReducer'
import {onGetPosts} from  '../../reducers/profileReducer'


export const getPostsByTag =tag => {
    return dispatch => {
      let url=  "http://localhost:5000/api/posts/tag/"+tag
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
          console.log('getPostsByTag data=',data)
          if (data.message) {
            
            console.error(data.message)
          } else {
           dispatch(onGetPosts(data))
          }
        })
      }
}

export const searchTagsBySubstring =searchWord => {
    return dispatch => {
      let url=  "http://localhost:5000/api/tags?search="+searchWord
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
          console.log('getCommentsByPostId data=',data)
          if (data.message) {
            
            console.error(data.message)
          } else {
           dispatch(onGetSearchedTags(data))
          }
        })
      }
}


export const saveTag = tag => {
    return dispatch => {
      return fetch("http://localhost:5000/api/tags", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.token
        },
        body: JSON.stringify(tag)
      })
        .then(resp => resp.json())
        .then(data => {
          //console.log('data after post send='+data.postBody)
          if (data.message) {
            
            //Тут прописываем логику
          } else {
          
           dispatch(onAddTag(data))
          }
        })
      } 
}

// export const sendUserPost = post => {
//     return dispatch => {
//       return fetch("http://localhost:5000/api/posts", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization':localStorage.token
//         },
//         body: JSON.stringify(post)
//       })
//         .then(resp => resp.json())
//         .then(data => {
//           //console.log('data after post send='+data.postBody)
//           if (data.message) {
            
//             //Тут прописываем логику
//           } else {
//            // localStorage.setItem("token", data.jwt)
//            dispatch(onAddPosts(data))
//           }
//         })
//       } 
// }
//   export const getPostsByUserId = userId => {
//     return dispatch => {
//       let url=  "http://localhost:5000/api/posts/"+userId
//       console.log('url='+url)
//       return fetch(url, {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization':localStorage.token
//        }

//       })
//         .then(resp => resp.json())
//         .then(data => {
//           console.log('userPostSend data=',data)
//           if (data.message) {
            
//             console.error(data.message)
//           } else {
//            dispatch(onGetPosts(data))
//           }
//         })
//       }
// }