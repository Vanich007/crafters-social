const ADDPOSTS='ADDPOSTS', DELETEPOSTBYID='DELETEPOSTBYID',
    GETPROFILE = 'GETPROFILE', GETPOSTS = 'GETPOSTS', GETPHOTOS = 'GETPHOTOS', DELETEPHOTOBYID = 'DELETEPHOTOBYID',
    ADDPHOTO = 'ADDPHOTO', ADDCOMMENT = 'ADDCOMMENT', GETCOMMENTS = 'GETCOMMENTS', ADDPOSTPHOTO = 'ADDPOSTPHOTO',
    FOLLOWUSER = 'FOLLOWUSER', UNFOLLOWUSER = 'UNFOLLOWUSER', UPDATEPOST = 'UPDATEPOST', UPDATECOMMENT = 'UPDATECOMMENT',
    SETPOSTTITLEBODY = 'SETPOSTTITLEBODY', CLEARPOST = 'CLEARPOST', TAGSELECTED = 'TAGSELECTED',
    GETSEARCHEDPOSTS='GETSEARCHEDPOSTS'
type PostCommentsType = {
    likes: Array<string>, _id: string, username: string, user: string,
    date: string, commentBody: string, postId: string
}
type PhotosType={photoComment: string,date:string,likes:Array<string>, _id: string,user:string, photoImageSrc: string }

type DelaultStateType = {
    postComments: Array<PostCommentsType>,
    photos: Array<PhotosType>,
    selectedTags: Array<string>,
    follow: Array<string>,
    searchedPosts:Array<SearchedPostsType>,status: '',
    publicName:string, //- чьи данные профиля загружены
    livingPlace:string,
    profileImageSrc: string,
    postImageSrc:string,
    date:string,
    postsIsFetching: boolean,
    profileIsFetching: boolean,
    profileId: string|null,
    postTitle: string,
    postBody: string,
    postId:string,
}
type SearchedPostsType={
    likes: Array<string>, postTags: Array<string>, _id: string, user: string,
    date: string, postTitle: string, postBody: string, postImageSrc: string
}
const defaultstate:DelaultStateType = {

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
            newState.follow=[...action.follow]
            return newState
                case UNFOLLOWUSER:
            newState.follow=[...action.follow]
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
            newState.follow=[...action.profile.follow]
         
            return newState

        default: return state
    }
}
type OnUpdateCommentACType={type:typeof UPDATECOMMENT, comment:PostCommentsType}
export const onUpdateComment = (comment): OnUpdateCommentACType => { return { comment, type: UPDATECOMMENT } }
type OnAddPostsACType={type:typeof ADDPOSTS,posts:Array<SearchedPostsType>}
export const onAddPosts = (posts): OnAddPostsACType => { return { posts, type: ADDPOSTS } }
type OnGetPostsACType={type:typeof GETPOSTS,posts:Array<SearchedPostsType>}
export const onGetPosts = (posts): OnGetPostsACType => { return { posts, type: GETPOSTS } }
type OnDeletePostByIdACType={type:typeof DELETEPOSTBYID,id:string}
export const onDeletePostById = (id): OnDeletePostByIdACType => { return { id, type: DELETEPOSTBYID } }
type OnGetPhotoACType={type:typeof GETPHOTOS,photos:Array<PhotosType>}
export const onGetPhoto = (photos): OnGetPhotoACType => { return { photos, type: GETPHOTOS } }
type OnGetProfileACType = { type: typeof GETPROFILE, profile: Object }
export const onGetProfile = (profile): OnGetProfileACType => { return { profile, type: GETPROFILE } }
type OnAddPhotoACType={type:typeof ADDPHOTO,photo:PhotosType}
export const onAddPhoto = (photo): OnAddPhotoACType => { return { photo, type: ADDPHOTO } }
type OnAddPostPhotoACType={type:typeof ADDPOSTPHOTO,photo:PhotosType}
export const onAddPostPhoto = (photo): OnAddPostPhotoACType => { return { photo, type: ADDPOSTPHOTO } }
type OnDeletePhotoByIdACType={type:typeof DELETEPHOTOBYID,id:string}
export const onDeletePhotoById = (id): OnDeletePhotoByIdACType => { return { id, type: DELETEPHOTOBYID } }
type OnAddCommentACType={type:typeof ADDCOMMENT,comment:PostCommentsType}
export const onAddComment = (comment): OnAddCommentACType => { return { comment, type: ADDCOMMENT } }
type OnGetCommentsACType={type:typeof GETCOMMENTS,comments:Array<PostCommentsType>}
export const onGetComments = (comments): OnGetCommentsACType => { return { comments, type: GETCOMMENTS } }
type OnFollowACType={type:typeof FOLLOWUSER,userId:string}
export const onFollow = (userId): OnFollowACType => { return { userId, type: FOLLOWUSER } }
type OnUnfollowACType={type:typeof UNFOLLOWUSER,userId:string}
export const onUnfollow = (userId): OnUnfollowACType => { return { userId, type: UNFOLLOWUSER } }
type OnUpdatePostACType={type:typeof UPDATEPOST,post:SearchedPostsType}
export const onUpdatePost = (post): OnUpdatePostACType => { return { post, type: UPDATEPOST } }
type OnSetPostTitleBodyACType={type:typeof SETPOSTTITLEBODY,title:string, body:string, id:string}
export const onSetPostTitleBody = (title, body, id): OnSetPostTitleBodyACType => { return { title, body, id, type: SETPOSTTITLEBODY } }
type OnClearPostACType={type: typeof CLEARPOST}
export const onClearPost = (): OnClearPostACType => { return { type: CLEARPOST } }
type OnSelectTagACType={type:typeof TAGSELECTED,tag:string}
export const onSelectTag = (tag):OnSelectTagACType => { return { tag, type: TAGSELECTED } }
type onGetSearchedPosts={type:typeof GETSEARCHEDPOSTS,posts:Array<SearchedPostsType>}
export const onGetSearchedPosts = (posts):onGetSearchedPosts => { return { posts, type: GETSEARCHEDPOSTS } }





export default profileReducer