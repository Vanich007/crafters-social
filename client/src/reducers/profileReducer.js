const ADDPOSTS='ADDPOSTS', DELETEPOSTBYID='DELETEPOSTBYID',
    GETPROFILE = 'GETPROFILE', GETPOSTS = 'GETPOSTS', GETPHOTOS = 'GETPHOTOS', DELETEPHOTOBYID = 'DELETEPHOTOBYID',
    ADDPHOTO = 'ADDPHOTO', ADDCOMMENT = 'ADDCOMMENT', GETCOMMENTS = 'GETCOMMENTS', ADDPOSTPHOTO = 'ADDPOSTPHOTO',
    FOLLOWUSER = 'FOLLOWUSER', UNFOLLOWUSER = 'UNFOLLOWUSER', UPDATEPOST = 'UPDATEPOST', UPDATECOMMENT = 'UPDATECOMMENT',
    SETPOSTTITLEBODY='SETPOSTTITLEBODY',CLEARPOST='CLEARPOST',TAGSELECTED = 'TAGSELECTED'

const defaultstate = {
    posts: [
        {
           likes:['605b733f6fd9cf1bc86adb90'], postTags:['тэг1','тэг2'],_id: '60870d2d77e1d63530e009d3', user: '60870d2d77e1d63530e007d3', date: 'дата', postTitle:'Название поста',postBody: `Установлено, что в 2015 году с возглавляемой им коммерческой структурой был заключен договор подряда на выполнение работ по строительству складских сооружений, возводимых в интересах одного из государственных заказчиков на территории Камчатского края. В качестве аванса на расчетный счет организации было перечислено более 700 млн рублей.

Однако подрядчик взятые на себя обязательства не исполнил и строительно-монтажные работы не выполнил. Полученные денежные средства были похищены путем вывода на расчетные счета сторонних организаций.

В ходе расследования уголовного дела сотрудниками Следственного департамента МВД России совместно с сотрудниками ГУЭБиПК МВД России, ГУ МВД России по г. Москве, ГУ МВД России по г. Санкт-Петербургу и Ленинградской области при силовой поддержке сотрудников Росгвардии проведено 19 обысков на территории трех субъектов Российской Федерации. Обнаружены и изъяты финансово-хозяйственные документы, средства связи, компьютерная техника, электронные носители информации, имеющие доказательственное значение. `,postImageSrc:'https://static.mvd.ru/upload/site1/document_news/Kaliningrad-630xx225.jpg?rnd=0.4784786219426467'},
       {
           likes:['605b733f6fd9cf1bc86adb90'] ,postTags:[], _id: '60870d2d77e1d63530e007d3', user: '60870d2d77e1d63530e007d3', date: 'дата', postTitle:'Название поста2',postBody: `Установлено, что в 2015 году с возглавляемой им коммерческой структурой был заключен договор подряда на выполнение работ по строительству складских сооружений, возводимых в интересах одного из государственных заказчиков на территории Камчатского края. В качестве аванса на расчетный счет организации было перечислено более 700 млн рублей.

Однако подрядчик взятые на себя обязательства не исполнил и строительно-монтажные работы не выполнил. Полученные денежные средства были похищены путем вывода на расчетные счета сторонних организаций.

В ходе расследования уголовного дела сотрудниками Следственного департамента МВД России совместно с сотрудниками ГУЭБиПК МВД России, ГУ МВД России по г. Москве, ГУ МВД России по г. Санкт-Петербургу и Ленинградской области при силовой поддержке сотрудников Росгвардии проведено 19 обысков на территории трех субъектов Российской Федерации. Обнаружены и изъяты финансово-хозяйственные документы, средства связи, компьютерная техника, электронные носители информации, имеющие доказательственное значение. `,postImageSrc:'https://static.mvd.ru/upload/site1/document_news/Kaliningrad-630xx225.jpg?rnd=0.4784786219426467'}
    ],
    postComments: [{likes:['605b733f6fd9cf1bc86adb90'], _id: '60870d2d77e1d63530e007d3', username:'Петро',user: '605b733f6fd9cf1bc86adb90', date: 'дата', commentBody: 'Комментарий супер!!!', postId: '60870d2d77e1d63530e007d3' },
    {likes:[],_id:'60870d2d77e1d63530e007d3',username:'Володька',user:'605b733f6fd9cf1bc86adb90',date:'дата',commentBody:'Не согласен категорически!!!',postId:'60870d2d77e1d63530e007d3'}]
    ,
    photos: [],
    follow:[],
    status: 'Default status1',
    publicName:'publicName1', //- чьи данные профиля загружены
    livingPlace:'livingPlace1',
    profileImageSrc: '',
    postImageSrc:'',
    date:'',
    postsIsFetching: false,
    profileIsFetching: false,
    profileId: null,
    postTitle: '',
    postBody: '',
    postId:'',
    selectedTags: []
                
    }
  
const profileReducer=(state = defaultstate, action)=>{
    let newState = { ...state };
    switch (action.type)
    {
     case TAGSELECTED:
        newState.selectedTags=[...state.selectedTags,action.tag]
            return newState      
        case CLEARPOST:
            newState.postTitle = ''
            newState.postBody = ''
            newState.selectedTags = []
            newState.postImageSrc = ''
            newState.postId=''
            newState.postImageSrc=''
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
                const index = newState.postComments.findIndex(item => item.id === id)
        
        
                const before = newState.postComments.slice(0, index)
                const after = newState.postComments.slice(index + 1)
                newState.postComments = [...before, action.comment, ...after]
            }
            return newState        
        case UPDATEPOST:
            {
                debugger
                let id = action.post._id
                const index = newState.posts.findIndex(item => item._id === id)
                const before = newState.posts.slice(0, index)
                const after = newState.posts.slice(index + 1)
                newState.posts = [...before, action.post, ...after]
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
            if(action.comments.length)newState.postComments=[action.comments]
            return newState 
        case GETPOSTS:
           
            if(action.posts)    
        {newState.posts=[...action.posts]} else {newState.posts=[]}
       // console.log('added posts:'+newState.posts)
            return newState 
        case ADDPOSTS:
          //  console.log('reducer posts='+action.posts.postBody)
            newState.posts=[action.posts,...state.posts]
            return newState

        case DELETEPOSTBYID:
            newState.posts=state.posts.filter(item=>item._id!=action.id)
            return newState  
            break
        case GETPHOTOS:
           // console.log('action.photos',action.photos)
            newState.photos=[...action.photos]
            return newState   
        case ADDPOSTPHOTO:
            console.log('Post action.photo',action.photo)
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
            //console.log(action)
            newState.status = action.profile.status
            newState.livingPlace = action.profile.livingPlace
            newState.profileImageSrc = action.profile.profileImageSrc
            newState.date = action.profile.date
            newState.publicName=action.profile.publicName
            newState.profileId=action.profile._id
         //  console.log('reducer profileId='+action.profile._id)
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




export default profileReducer