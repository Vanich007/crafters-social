import userReducer from './reducers/usersReducer'

let renderEntireTree = () => {
 
}


let store = {
  getState:function(){return this.state},
  state:{
    names:
      [{ name: 'Igor', id: 1 },
      { name: 'Dima', id: 2 },
        { name: 'Vadik', id: 3 }],
    mamesMaxId: 4,
    newUser:''

  },
  subscribe (observer) {
      renderEntireTree = observer
   
    },
  dispatch(action) {
    userReducer(this.getState(), action)
    renderEntireTree(this)
    }
    
  
  

  , changeNewUser(name) { store.state.newUser = name }
  
  

  }




export default store;
window.store = store;
