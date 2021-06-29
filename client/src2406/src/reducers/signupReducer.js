import { getProfileByUserId } from '../utils/API/connectProfile' 
const initialState = {
  currentUser: {_id:null},
  hasProfile:false
}

export default function signupReducer(state = initialState, action) {
    switch (action.type) {
      case 'LOGIN_USER':
            return { ...state, currentUser: action.payload }
        case 'LOGOUT_USER':
         
        return { ...state, currentUser: {} }
        
      default:
        return state;
    }
}
  
export const userPostFetch = user => {
  return dispatch => {
    return fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
        
        if (data.message) {
          
          //Тут прописываем логику
        } else {
          localStorage.setItem("token", data.jwt)
          dispatch(loginUser(data.user))
        }
      })
  }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})
export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

//залогиниваемся*********************************************************
export const userLoginFetch = user => {
  return dispatch => {
    return fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      //mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(resp => resp.json())
      .then(data => {
       
        if (data.message) {
         //тут ваша логика
        } else {
          localStorage.setItem("token", data.jwt)
          //localStorage.setItem("user", user)
          dispatch(loginUser(data.user))
        }
      })
  }
}
//логин по token***************************************
export const getProfileFetch = () => {
  return dispatch => {
    const token = localStorage.token;
    if (token) {
      return fetch("http://localhost:5000/api/auth/register", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          
          if (data.message) {
            console.error(data.message)
            // Будет ошибка если token не дествительный
            localStorage.removeItem("token")
            dispatch(logoutUser())
          } else {
          
            dispatch(loginUser(data.user))
            getProfileByUserId(data.user._id)
            
          }
        })
    }
  }
}
