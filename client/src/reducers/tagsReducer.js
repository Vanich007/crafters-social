const GOTSEARCHEDTAGS = 'GOTSEARCHEDTAGS', ADDTAG = 'ADDTAG',  
     GETSELECTEDUSERPOFILE = 'GETSELECTEDUSERPROFILE',
    GETSELECTEDUSERPHOTOS='GETSELECTEDUSERPHOTOS'

const defaultstate = {
    tags: [''],
        searchedTag:''
    }
  
const tagsReducer=(state = defaultstate, action)=>{
    let newState = { ...state };
    switch (action.type){
        case GOTSEARCHEDTAGS:  //для отображения в поиске
            newState.tags=action.tags.map(item=>item.tagBody)
           
        return newState
    case ADDTAG:
        newState.tags=[...state.tags,action.tag.tagBody]
            return newState
      
      
        default: return state
    }
}


export const onGetSearchedTags = (tags) => { return { tags, type: GOTSEARCHEDTAGS } }

export const onAddTag = (tag) => { return { tag, type: ADDTAG } }

 
export default tagsReducer