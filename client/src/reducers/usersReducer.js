const GOTSEARCHEDUSERS = 'GOTSEARCHEDUSERS', GETSELECTEDUSERPOSTS = 'GETSELECTEDUSERPOSTS',  
    SELECTUSER = 'SELECT-USER', GETSELECTEDUSERPOFILE = 'GETSELECTEDUSERPROFILE',
    GETSELECTEDUSERPHOTOS='GETSELECTEDUSERPHOTOS'

const defaultstate= {
        users:
            [{profileImageSrc:'',
                date:'',
                status:'',
                livingPlace:'',
                publicName:'',
            _id: ''
        }],
    selectedUserPhotos: [{ photoImageSrc: '' }],
    selectedUserProfile:{    status: '',
    publicName:'', //- чьи данные профиля загружены
    livingPlace:'',
    profileImageSrc:'',
    date:'',_id:''},
    selectedUserPosts: [],
     
    selectedUser: ''
    }
  
const userReducer=(state = defaultstate, action)=>{
    let newState = { ...state };
    switch (action.type){
        case GOTSEARCHEDUSERS:  //для отображения в поиске
            newState.users=[...action.data]
            
        return newState
    case SELECTUSER:
        newState.selectedUser= action.id
            return newState
        case GETSELECTEDUSERPOSTS:   
            newState.selectedUserPosts=[...action.posts]
            return newState
        case GETSELECTEDUSERPHOTOS:    
        newState.selectedUserPhotos=[...action.photos]
            return newState
        case GETSELECTEDUSERPOFILE:  
        newState.selectedUserProfile  ={...action.profile} 
            return newState
        default: return state
    }
}

 export const onSelectedUser=(id)=> { return { id,type: SELECTUSER } }
export const onGetSearchedProfiles = (data) => { return { data, type: GOTSEARCHEDUSERS } }
export const onGetSelectedUserPosts = (posts) => { return { posts, type: GETSELECTEDUSERPOSTS } }
export const onGetSelectedUserPhoto = (photos) => { return { photos, type: GETSELECTEDUSERPHOTOS } }
export const onGetSelectedUserProfile = (profile) => { return { profile, type: GETSELECTEDUSERPOFILE } }
 
export default userReducer