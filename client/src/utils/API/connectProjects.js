import { onGetProjects,onAddProject,onDeleteProject,onUpdateProject } from '../../reducers/projectsReducer'
import {onGetPosts} from '../../reducers/profileReducer'
export const getProjectById = userId => {
    return dispatch => {
      let url=  "/api/projects/"+userId
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
           // console.log('data',data)
           dispatch(onGetProjects(data))
           if(data[0].projectPosts)dispatch(onGetPosts(data[0].projectPosts))
           
          }
        })
      }
}

  export const getProjectByUserId = userId => {
    return dispatch => {
      if (!userId||userId==='undefined') return null
      let url=  `/api/projects/user/?userId=${userId}`
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
           dispatch(onGetProjects(data))
          }
        })
      }
}
  export const deleteProjectById = projectId => {
    return dispatch => {
      let url=  "/api/projects/"+projectId
      return fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
           Accept: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            
          } else {dispatch(onDeleteProject(data.deleted))
          }
        })
      }
}

export function sendUserProject(project) {
  return dispatch => { 
    return fetch("/api/projects", {
      method: "POST",
      headers: {
        'Authorization': localStorage.token
      },
      body: project
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          //Тут прописываем логику
        } else {
          // localStorage.setItem("token", data.jwt)
          dispatch(onAddProject(data))
        }
      })
   
  }
}
export function updateUserProject(projectId,project) {
  return dispatch => { 
    const url="/api/projects/"+projectId
    return fetch(url, {
      method: "PATCH",
      headers: {
        'Authorization': localStorage.token
      },
      body: project
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.message) {
          //Тут прописываем логику
        } else {
          // localStorage.setItem("token", data.jwt)
          dispatch(onUpdateProject(data))
        }
      })
   
  }
}
export function likeProjectById(id) {
  return dispatch => {
    let url = "/api/projects/like/" + id
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
          dispatch(onUpdateProject(data))
          
        }
      })
   
  }
}
export function unlikeProjectById(id) {
  return dispatch => {
    let url = "/api/projects/unlike/" + id
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
          dispatch(onUpdateProject(data))
        }
      })
   
  }
}