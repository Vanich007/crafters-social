import userReducer from './reducers/usersReducer'
import profileReducer from './reducers/profileReducer'
import signupReducer from './reducers/signupReducer'
import dialogsReducer from './reducers/dialogsReducer'
import tagsReducer from './reducers/tagsReducer'
import projectsReducer from './reducers/projectsReducer'
import{applyMiddleware, combineReducers, createStore} from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'
let reducers = combineReducers({
    usersPage: userReducer,
    profilePage: profileReducer,
    signupPage:signupReducer,
    dialogsPage:dialogsReducer,
    tagsPage: tagsReducer,
    projectsPage:projectsReducer,
    form: formReducer
})
let store=createStore(reducers,applyMiddleware(thunkMiddleware))



export default store;

