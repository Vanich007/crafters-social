import {onGetLenta,onUpdatePost, onAddPosts, onGetPosts, onAddComment, onGetComments, onDeletePostById ,onGetSearchedPosts} from '../../reducers/profileReducer'
import {onUpdateComment} from '../../reducers/profileReducer'

export function clearCommentById(id) {
  return dispatch => {
    let url = "http://localhost:5000/api/posts/comments/" + id
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
       
          dispatch(onUpdateComment(data))
        }
      })
   
  }
}

export const searchPostsByKeyword = (keyword,user='') => {
    return dispatch => {
      let url=  `http://localhost:5000/api/posts/search/?substring=${keyword}&user=${user}&limit=100`
      
      return fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            
            console.error(data.message)
          } else {
           dispatch(onGetSearchedPosts(data))
          }
        })
      }
}
export const getLenta= () => {
    return dispatch => {
      let url=  "http://localhost:5000/api/lenta/"
      
      return fetch(url, {
        method: "GET",
        headers: {
          'Authorization': localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            
            console.error(data.message)
          } else {
           dispatch(onGetSearchedPosts(data))
           //getPostsByUserId(data._id)
          }
        })
      }
}


export function likeCommentById(id) {
  return dispatch => {
    let url = "http://localhost:5000/api/posts/comments/like/" + id
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

export function likePostById(id,lookingProject=null) {
  return dispatch => {
    let url = "http://localhost:5000/api/posts/like/" + id
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
          dispatch(onUpdatePost(data))
        }
      })
   
  }
}
export function unlikePostById(id,lookingProject=null) {
  return dispatch => {
    let url = "http://localhost:5000/api/posts/unlike/" + id
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
          dispatch(onUpdatePost(data))
        }
      })
   
  }
}
export const getCommentsByPostId = postId => {
    return dispatch => {
      let url=  `http://localhost:5000/api/posts/comments/?postId=${postId}&limit=100`
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
          if (data.deleted) {
            dispatch(onDeletePostById(data.deleted))
            
          } else {
            if (data.message)console.error(data.message)
          }
        })
      }
}

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
  export const getPostsByUserId = userId => {
    return dispatch => {
      if (!userId||userId==='undefined') return null
      let url=  `http://localhost:5000/api/posts/?userId=${userId}&limit=50&offset=0`
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
           dispatch(onGetPosts(data))
          }
        })
      }
}

 export const getPostById = id => {
    return dispatch => {
      let url=  "http://localhost:5000/api/posts/id/"+id
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
           dispatch(onGetPosts(data))
          }
        })
      }
}
