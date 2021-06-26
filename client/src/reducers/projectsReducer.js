const GOTPROJECTSS = 'GOTPROJECTSS', ADDPROJECT = 'ADDPROJECT', DELETEPROJECT = 'DELETEPROJECT',
    UPDATEPROJECT = 'UPDATEPROJECT', ADDPROJECTPHOTO = 'ADDPROJECTPHOTO', CLEARPROJECT = 'CLEARPROJECT',
TAGSELECTED='TAGSELECTED',SETPROJECTTITLEBODY='SETPROJECTTITLEBODY',POSTSELECTED='POSTSELECTED',
CLEARSELECTEDPOSTS="CLEARSELECTEDPOSTS"

const defaultstate = {
    projects: [{
        _id:'',
    user: '',
    date: '',
    projectBody: '',
    projectTitle: '',
    projectPosts:[
        { likes:[''], postTags:[''],_id: '', user: '', date: '', postTitle:'',postBody: ``,postImageSrc:''}
    ],
    projectImageSrc: '',
    likes: [
        ''
        ],
    
    } ],
    selectedTags: [],  //выбраны в форме AddProject
selectedPosts:[],       //выбраны в форме AddProject
projectBody: '',
    projectTitle: '',
    projectPosts:[],
    projectImageSrc: '',
    projectId:''
    }
  
const tagsReducer=(state = defaultstate, action)=>{
    let newState = { ...state };
    switch (action.type) {
        case SETPROJECTTITLEBODY:
             newState.projectTitle = action.title
            newState.projectBody = action.body
            newState.projectId = action.id
            newState.projectComments=[]
         return newState 
        case TAGSELECTED:
        newState.selectedTags=[...state.selectedTags,action.tag]
            return newState    
        case GOTPROJECTSS:  //для отображения в поиске
            newState.projects=[...action.projects]
            
            
        return newState
    case ADDPROJECT:
        newState.projects=[...state.projects,action.project]
        console.log(action.project)
            return newState
        case DELETEPROJECT: 
             
            {
                let id = action.projectId
                const index = newState.projects.findIndex(item => item._id === id)
                const before = newState.posts.slice(0, index)
                const after = newState.posts.slice(index + 1)
                newState.projects = [...before, ...after]
            }
        newState.projects=[...state.projects,action.project]
            return newState
        case UPDATEPROJECT: 
             
            {
                let id = action.project._id
                const index = newState.projects.findIndex(item => item._id === id)
                let before = []
                let after =[]
                if(newState.projects){before=newState.projects.slice(0, index)}
                if(newState.projects){after = newState.projects.slice(index + 1)}
                newState.projects = [...before, action.project, ...after]
            }
        //newState.projects=[...state.projects,action.project]
            return newState   
                case ADDPROJECTPHOTO:
            
            newState.projectImageSrc=action.photo
            return newState 
              case CLEARPROJECT:
            newState.projectTitle = ''
            newState.projectBody = ''
            newState.selectedTags = []
            newState.projectImageSrc = ''
            newState.projectId=''
            newState.projectPosts=[]
            return newState  
        case POSTSELECTED:
            newState.selectedPosts=[...newState.selectedPosts,action.post]
            return newState  
        case CLEARSELECTEDPOSTS:
            newState.selectedPosts=[]
            return newState  
        default: return state
    }
}


export const onGetProjects = (projects) => { return { projects, type: GOTPROJECTSS } }

export const onAddProject = (project) => { return { project, type: ADDPROJECT } }
export const onDeleteProject = (projectId) => { return { projectId, type: DELETEPROJECT } }
export const onUpdateProject = (project) => { return { project, type: UPDATEPROJECT } }
export const onAddProjectPhoto = (photo) => { return { photo, type: ADDPROJECTPHOTO } }
export const onClearProject = () => { return { type: CLEARPROJECT } }
export const onSelectProjectTag = (tag) => { return { tag, type: TAGSELECTED } }
export const onSetProjectTitleBody = (title, body,id) => { return { title, body, id, type: SETPROJECTTITLEBODY } }
 export const onSelectProjectPost = (post) => { return { post, type: POSTSELECTED } }
 export const onClearSelectProjectPost=()=>{return {type:CLEARSELECTEDPOSTS}}
export default tagsReducer