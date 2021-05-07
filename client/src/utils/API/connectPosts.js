import {onUpdatePost, onAddPosts, onGetPosts, onAddComment, onGetComments, onDeletePostById } from '../../reducers/profileReducer'
import {onUpdateComment} from '../../reducers/profileReducer'


export function likeCommentById(id) {
  return dispatch => {
    let url = "http://localhost:5000/api/posts/comments/like/" + id
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
               if (data.message) {
          console.error(data.message)
          //Тут прописываем логику
        } else {
       
          dispatch(onUpdateComment(data))
        }
      })
   
  }
}
export function unlikeCommentById(id) {
  return dispatch => {
    let url = "http://localhost:5000/api/posts/comments/unlike/" + id
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
               if (data.message) {
          console.error(data.message)
          //Тут прописываем логику
        } else {
       
          dispatch(onUpdateComment(data))
        }
      })
   
  }
}

export function likePostById(id) {
  return dispatch => {
    let url = "http://localhost:5000/api/posts/like/" + id
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
          dispatch(onUpdatePost(data))
        }
      })
   
  }
}
export function unlikePostById(id) {
  return dispatch => {
    let url = "http://localhost:5000/api/posts/unlike/" + id
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
          dispatch(onUpdatePost(data))
        }
      })
   
  }
}
export const getCommentsByPostId = postId => {
    return dispatch => {
      let url=  "http://localhost:5000/api/posts/comments/"+postId
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
           dispatch(onGetComments(data))
          }
        })
      }
}


export const sendPostComment = comment => {
    return dispatch => {
      return fetch("http://localhost:5000/api/posts/comments", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.token
        },
        body: JSON.stringify(comment)
      })
        .then(resp => resp.json())
        .then(data => {
          //console.log('data after post send='+data.postBody)
          if (data.message) {
            
            //Тут прописываем логику
          } else {
          
           dispatch(onAddComment(data))
          }
        })
      } 
}
  export const deletePostById = photoId => {
    return dispatch => {
      let url=  "http://localhost:5000/api/posts/"+photoId
      //console.log('url='+url)
      return fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization':localStorage.token,
           Accept: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log('delete data=',data)
          if (data.message='Пост удален') {
            dispatch(onDeletePostById(photoId))
            console.error(data.message)
          } else {
            //console.log('returned photos id='+data._id)
           
       
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
export function sendUserPost(post) {
  return dispatch => { 
    return fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        'Authorization': localStorage.token
      },
      body: post
    })
      .then(resp => resp.json())
      .then(data => {
        //console.log('updProfile data=',data)
        if (data.message) {
          console.error(data.message)
          //Тут прописываем логику
        } else {
          // localStorage.setItem("token", data.jwt)
          dispatch(onAddPosts(data))
        }
      })
   
  }
}
export function updateUserPost(postId,post) {
  return dispatch => { 
    const url="http://localhost:5000/api/posts/"+postId
    return fetch(url, {
      method: "PATCH",
      headers: {
        'Authorization': localStorage.token
      },
      body: post
    })
      .then(resp => resp.json())
      .then(data => {
        //console.log('updProfile data=',data)
        if (data.message) {
          console.error(data.message)
          //Тут прописываем логику
        } else {
          // localStorage.setItem("token", data.jwt)
          dispatch(onAddPosts(data))
        }
      })
   
  }
}
  export const getPostsByUserId = userId => {
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
           dispatch(onGetPosts(data))
          }
        })
      }
}