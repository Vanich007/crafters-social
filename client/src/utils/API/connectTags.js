import { onGetSearchedTags, onAddTag } from '../../reducers/tagsReducer'
import {onGetPosts} from  '../../reducers/profileReducer'


export const getPostsByTag =tag => {
    return dispatch => {
      let url=  `/api/posts/tag/?tag=${tag}`
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

export const searchTagsBySubstring =searchWord => {
    return dispatch => {
      let url=  "/api/tags?search="+searchWord
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
           dispatch(onGetSearchedTags(data))
          }
        })
      }
}


export const saveTag = tagBody => {
    return dispatch => {
      return fetch("/api/tags", {
        method: "POST",
        headers: {
          'Authorization':localStorage.token
        },
        body: tagBody
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            
            //Тут прописываем логику
          } else {
          
           dispatch(onAddTag(data))
          }
        })
      } 
}

