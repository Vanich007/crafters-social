const GOTPROJECTSS = 'GOTPROJECTSS', ADDPROJECT = 'ADDPROJECT', DELETEPROJECT = 'DELETEPROJECT',
    UPDATEPROJECT = 'UPDATEPROJECT', ADDPROJECTPHOTO = 'ADDPROJECTPHOTO', CLEARPROJECT = 'CLEARPROJECT',
TAGSELECTED='TAGSELECTED',SETPROJECTTITLEBODY='SETPROJECTTITLEBODY',POSTSELECTED='POSTSELECTED',
CLEARSELECTEDPOSTS="CLEARSELECTEDPOSTS"

const defaultstate = {
    projects: [{
        _id:'605b733f6fd9cf1bc861db91',
    user: '60870d2d77e1d63530e007d3',
    date: '2021-05-10',
    projectBody: 'Крутой проект по изготовлению полезных изделий из бумаги и клея',
    projectTitle: 'Название проекта',
    projectPosts:[
        {
           likes:['605b733f6fd9cf1bc86adb90'], postTags:['тэг1','тэг2'],_id: '60870d2d77e1d63530e009d3', user: '60870d2d77e1d63530e007d3', date: 'дата', postTitle:'Название поста',postBody: `Установлено, что в 2015 году с возглавляемой им коммерческой структурой был заключен договор подряда на выполнение работ по строительству складских сооружений, возводимых в интересах одного из государственных заказчиков на территории Камчатского края. В качестве аванса на расчетный счет организации было перечислено более 700 млн рублей.

Однако подрядчик взятые на себя обязательства не исполнил и строительно-монтажные работы не выполнил. Полученные денежные средства были похищены путем вывода на расчетные счета сторонних организаций.

В ходе расследования уголовного дела сотрудниками Следственного департамента МВД России совместно с сотрудниками ГУЭБиПК МВД России, ГУ МВД России по г. Москве, ГУ МВД России по г. Санкт-Петербургу и Ленинградской области при силовой поддержке сотрудников Росгвардии проведено 19 обысков на территории трех субъектов Российской Федерации. Обнаружены и изъяты финансово-хозяйственные документы, средства связи, компьютерная техника, электронные носители информации, имеющие доказательственное значение. `,postImageSrc:'https://static.mvd.ru/upload/site1/document_news/Kaliningrad-630xx225.jpg?rnd=0.4784786219426467'},
       {
           likes:['605b733f6fd9cf1bc86adb90'] ,postTags:[], _id: '60870d2d77e1d63530e007d3', user: '60870d2d77e1d63530e007d3', date: 'дата', postTitle:'Название поста2',postBody: `Установлено, что в 2015 году с возглавляемой им коммерческой структурой был заключен договор подряда на выполнение работ по строительству складских сооружений, возводимых в интересах одного из государственных заказчиков на территории Камчатского края. В качестве аванса на расчетный счет организации было перечислено более 700 млн рублей.

Однако подрядчик взятые на себя обязательства не исполнил и строительно-монтажные работы не выполнил. Полученные денежные средства были похищены путем вывода на расчетные счета сторонних организаций.

В ходе расследования уголовного дела сотрудниками Следственного департамента МВД России совместно с сотрудниками ГУЭБиПК МВД России, ГУ МВД России по г. Москве, ГУ МВД России по г. Санкт-Петербургу и Ленинградской области при силовой поддержке сотрудников Росгвардии проведено 19 обысков на территории трех субъектов Российской Федерации. Обнаружены и изъяты финансово-хозяйственные документы, средства связи, компьютерная техника, электронные носители информации, имеющие доказательственное значение. `,postImageSrc:'https://static.mvd.ru/upload/site1/document_news/Kaliningrad-630xx225.jpg?rnd=0.4784786219426467'}
    ],
    projectImageSrc: 'https://static.mvd.ru/upload/site81/document_images/IMG_0581_d1-800x600.jpg',
    likes: [
        '605b733f6fd9cf1bc86adb90'
        ],
    
    },
        {
        _id:'605b733f6fd9cf1bc861db92',
    user: '60870d2d77e1d63530e007d3',
    date: '2021-05-10',
    projectBody: 'Крутой проект по изготовлению полезных изделий из бумаги и клея',
    projectTitle: 'Название проекта 2',
    projectPosts:[
        {
           likes:['605b733f6fd9cf1bc86adb90'], postTags:['тэг1','тэг2'],_id: '60870d2d77e1d63530e009d3', user: '60870d2d77e1d63530e007d3', date: 'дата', postTitle:'Название поста',postBody: `Установлено, что в 2015 году с возглавляемой им коммерческой структурой был заключен договор подряда на выполнение работ по строительству складских сооружений, возводимых в интересах одного из государственных заказчиков на территории Камчатского края. В качестве аванса на расчетный счет организации было перечислено более 700 млн рублей.

Однако подрядчик взятые на себя обязательства не исполнил и строительно-монтажные работы не выполнил. Полученные денежные средства были похищены путем вывода на расчетные счета сторонних организаций.

В ходе расследования уголовного дела сотрудниками Следственного департамента МВД России совместно с сотрудниками ГУЭБиПК МВД России, ГУ МВД России по г. Москве, ГУ МВД России по г. Санкт-Петербургу и Ленинградской области при силовой поддержке сотрудников Росгвардии проведено 19 обысков на территории трех субъектов Российской Федерации. Обнаружены и изъяты финансово-хозяйственные документы, средства связи, компьютерная техника, электронные носители информации, имеющие доказательственное значение. `,postImageSrc:'https://static.mvd.ru/upload/site1/document_news/Kaliningrad-630xx225.jpg?rnd=0.4784786219426467'},
       {
           likes:['605b733f6fd9cf1bc86adb90'] ,postTags:[], _id: '60870d2d77e1d63530e007d3', user: '60870d2d77e1d63530e007d3', date: 'дата', postTitle:'Название поста2',postBody: `Установлено, что в 2015 году с возглавляемой им коммерческой структурой был заключен договор подряда на выполнение работ по строительству складских сооружений, возводимых в интересах одного из государственных заказчиков на территории Камчатского края. В качестве аванса на расчетный счет организации было перечислено более 700 млн рублей.

Однако подрядчик взятые на себя обязательства не исполнил и строительно-монтажные работы не выполнил. Полученные денежные средства были похищены путем вывода на расчетные счета сторонних организаций.

В ходе расследования уголовного дела сотрудниками Следственного департамента МВД России совместно с сотрудниками ГУЭБиПК МВД России, ГУ МВД России по г. Москве, ГУ МВД России по г. Санкт-Петербургу и Ленинградской области при силовой поддержке сотрудников Росгвардии проведено 19 обысков на территории трех субъектов Российской Федерации. Обнаружены и изъяты финансово-хозяйственные документы, средства связи, компьютерная техника, электронные носители информации, имеющие доказательственное значение. `,postImageSrc:'https://static.mvd.ru/upload/site1/document_news/Kaliningrad-630xx225.jpg?rnd=0.4784786219426467'}
    ],
    projectImageSrc: 'https://static.mvd.ru/upload/site81/document_images/IMG_0581_d1-800x600.jpg',
    likes: [
        '605b733f6fd9cf1bc86adb90'
        ],
    
}
    ],
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