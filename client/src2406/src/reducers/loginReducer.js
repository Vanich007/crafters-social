const SETUSERDATA = 'SETUSERDATA'

const defaultstate = {
    userId: null,
    email: null,
    login: null,
    isAuth:false
    }
  
const authReducer=(state = defaultstate, action)=>{
    
   
    switch (action.type)
    {
        case SETUSERDATA:
            let newState = { ...state,...action.data };
            return newState
     

        default: return state
    }
}
export const setAuthUserData = (userId, email, login) => { return { data:{userId, email, login}, type: SETUSERDATA } }

export default authReducer