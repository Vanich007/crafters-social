const GOTSEARCHEDUSERS = 'GOTSEARCHEDUSERS', GETSELECTEDUSERPOSTS = 'GETSELECTEDUSERPOSTS',  
    SELECTUSER = 'SELECT-USER', GETSELECTEDUSERPOFILE = 'GETSELECTEDUSERPROFILE',
    GETSELECTEDUSERPHOTOS='GETSELECTEDUSERPHOTOS'

const defaultstate= {
        users:
            [{profileImageSrc:'https://static.mvd.ru/upload/site1/document_news/Kaliningrad-630xx225.jpg?rnd=0.4784786219426467',
                date:'дата регистрации',
                status:'Здесь будет статус',
                livingPlace:'Здесь будет место жительства',
                publicName:'Здесь будет имя',
            _id: '605b733f6fd9cf1bc86adb90'
        }],
    selectedUserPhotos:[],
    selectedUserProfile:{    status: 'Здесь будет статус',
    publicName:'Здесь будет имя', //- чьи данные профиля загружены
    livingPlace:'Здесь будет место жительства',
    profileImageSrc:'https://static.mvd.ru/upload/site1/document_news/Kaliningrad-630xx225.jpg?rnd=0.4784786219426467',
    date:'дата регистрации',_id:'605b733f6fd9cf1bc86adb90'},
    selectedUserPosts: [],
    
    selectedUser: '605b733f6fd9cf1bc86adb90'
    }
  
const userReducer=(state = defaultstate, action)=>{
    let newState = { ...state };
    switch (action.type){
        case GOTSEARCHEDUSERS:  //для отображения в поиске
            newState.users=[...action.data]
            //console.log('newState.users'+newState.users)
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