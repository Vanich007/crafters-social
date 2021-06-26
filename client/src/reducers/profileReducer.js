const ADDPOSTS='ADDPOSTS', DELETEPOSTBYID='DELETEPOSTBYID',
    GETPROFILE = 'GETPROFILE', GETPOSTS = 'GETPOSTS', GETPHOTOS = 'GETPHOTOS', DELETEPHOTOBYID = 'DELETEPHOTOBYID',
    ADDPHOTO = 'ADDPHOTO', ADDCOMMENT = 'ADDCOMMENT', GETCOMMENTS = 'GETCOMMENTS', ADDPOSTPHOTO = 'ADDPOSTPHOTO',
    FOLLOWUSER = 'FOLLOWUSER', UNFOLLOWUSER = 'UNFOLLOWUSER', UPDATEPOST = 'UPDATEPOST', UPDATECOMMENT = 'UPDATECOMMENT',
    SETPOSTTITLEBODY = 'SETPOSTTITLEBODY', CLEARPOST = 'CLEARPOST', TAGSELECTED = 'TAGSELECTED',
    GETSEARCHEDPOSTS='GETSEARCHEDPOSTS'

const defaultstate = {

    postComments: [{likes:[''], _id: '', username:'',user: '', date: '', commentBody: '', postId: '' }]
    ,
    photos: [{photoComment: '',date:'',likes:[''], _id: '',user:'', photoImageSrc: '' }],
    follow:[],
    status: '',
    publicName:'', //- чьи данные профиля загружены
    livingPlace:'',
    profileImageSrc: '',
    postImageSrc:'',
    date:'',
    postsIsFetching: false,
    profileIsFetching: false,
    profileId: null,
    postTitle: '',
    postBody: '',
    postId:'',
    selectedTags: [],
    searchedPosts:[
        {
           likes:[''], postTags:[''],_id: '', user: '', date: '', postTitle:'',postBody: ``,postImageSrc:''},
       
    ]
                
    }
  
const profileReducer=(state = defaultstate, action)=>{
    let newState = { ...state };
    switch (action.type)
    {
        case GETSEARCHEDPOSTS:
            
                if(action.posts)    
        {newState.searchedPosts=[...action.posts]} else {newState.searchedPosts=[]}
      
            return newState 
     case TAGSELECTED:
        newState.selectedTags=[...state.selectedTags,action.tag]
            return newState      
        case CLEARPOST:
            newState.postTitle = ''
            newState.postBody = ''
            newState.selectedTags = []
            newState.postImageSrc = ''
            newState.postId=''
            
            return newState   
        case SETPOSTTITLEBODY:
            newState.postTitle = action.title
            newState.postBody = action.body
            newState.postId = action.id
            newState.postComments=[]
         return newState       
        case UPDATECOMMENT:
            { 
                let id = action.comment._id
                const index = newState.postComments.findIndex(item => item._id === id)
                const before = newState.postComments.slice(0, index)
                const after = newState.postComments.slice(index + 1)
                newState.postComments = [...before, action.comment, ...after]
            }
            return newState        
        case UPDATEPOST:
            {
                
                let id = action.post._id
                const index = newState.searchedPosts.findIndex(item => item._id === id)
                const before = newState.searchedPosts.slice(0, index)
                const after = newState.searchedPosts.slice(index + 1)
                newState.searchedPosts = [...before, action.post, ...after]
            }
            return newState
        case FOLLOWUSER:
            newState.follow=[...state.follow,action.userId]
            return newState
                case UNFOLLOWUSER:
            newState.follow=state.follow.filter(item=>item!=action.userId)
            return newState
        case ADDCOMMENT:
            newState.postComments=[action.comment,...state.postComments]
            return newState 
        case GETCOMMENTS:
            if(action.comments.length)newState.postComments=action.comments
            return newState 
        case GETPOSTS:
           
            if(action.posts)    
        {newState.searchedPosts=[...action.posts]} else {newState.searchedPosts=[]}
       
            return newState 
        case ADDPOSTS:
         
            newState.searchedPosts=[action.posts,...state.searchedPosts]
            return newState

        case DELETEPOSTBYID:
            
            newState.searchedPosts=state.searchedPosts.filter(item=>item._id!=action.id)
            return newState  
            
        case GETPHOTOS:
          
            newState.photos=[...action.photos]
            return newState   
        case ADDPOSTPHOTO:
            
            newState.postImageSrc=action.photo
            return newState  
        case ADDPHOTO:
            newState.photos=[...action.photo,...state.photos]
            return newState 
        case DELETEPHOTOBYID:
                    let id = action.id
                    const index = newState.photos.findIndex(item => item._id === id)
                    const before = newState.photos.slice(0, index)
                    const after = newState.photos.slice(index + 1)
                    const newArr = [...before, ...after]
                    newState.photos = newArr
            return newState
        case GETPROFILE:
            
            newState.status = action.profile.status
            newState.livingPlace = action.profile.livingPlace
            newState.profileImageSrc = action.profile.profileImageSrc
            newState.date = action.profile.date
            newState.publicName=action.profile.publicName
            newState.profileId=action.profile._id
         
            return newState

        default: return state
    }
}
export const onUpdateComment = (comment) => { return { comment, type: UPDATECOMMENT } }
export const onAddPosts = (posts) => { return { posts, type: ADDPOSTS } }
export const onGetPosts = (posts) => { return { posts, type: GETPOSTS } }
export const onDeletePostById=(id)=> { return { id, type: DELETEPOSTBYID } }
export const onGetPhoto = (photos) => { return { photos, type: GETPHOTOS } }
export const onGetProfile = (profile) => { return { profile, type: GETPROFILE } }
export const onAddPhoto = (photo) => { return { photo, type: ADDPHOTO } }
export const onAddPostPhoto = (photo) => { return { photo, type: ADDPOSTPHOTO } }
export const onDeletePhotoById = (id) => { return { id, type: DELETEPHOTOBYID } }
export const onAddComment = (comment) => { return { comment, type: ADDCOMMENT } }
export const onGetComments = (comments) => { return { comments, type: GETCOMMENTS } }
export const onFollow = (userId) => { return { userId, type: FOLLOWUSER } }
export const onUnfollow = (userId) => { return { userId, type: UNFOLLOWUSER } }
export const onUpdatePost = (post) => { return { post, type: UPDATEPOST } }
export const onSetPostTitleBody = (title, body,id) => { return { title, body, id, type: SETPOSTTITLEBODY } }
export const onClearPost = () => { return {  type: CLEARPOST } }
export const onSelectTag = (tag) => { return { tag, type: TAGSELECTED } }
export const onGetSearchedPosts = (posts) => { return { posts, type: GETSEARCHEDPOSTS } }





export default profileReducer