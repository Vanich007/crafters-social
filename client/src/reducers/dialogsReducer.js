const STARTDIALOG = 'STARTDIALOG',  GETMESSAGE = 'GETMESSAGE',
SENDMESSAGE='SENDMESSAGE',DELETEMESSAGE='DELETEMESSAGE',GOTDIALOGS='GOTDIALOGS'

const defaultstate= {
    dialogs: [{
        _id: "",
        profileImageSrc: "",
        publicName: "",
        _doc: {
            dialogDate: "",
            lastMessage: "",
            targetUser: "",
            user: "",
            _id: ""
        }
    }],
    messages: [{date: "",
messageBody: "",
messageImageSrc: "",
targetUser: "",
user: "",
__v: 0,
        _id: ""
    }]
    }   //state
  
    export default function dialogsReducer(state = defaultstate, action){
    let newState = { ...state };
    switch (action.type)
    {

        case STARTDIALOG:

            return newState
         case GOTDIALOGS:
           newState.dialogs=[...action.dialogs]
            return newState
            case GETMESSAGE:
                newState.messages=[...action.messages]
                return newState  

        case SENDMESSAGE:
           newState.messages.unshift(action.message)
            
            return newState

        case DELETEMESSAGE:
         //  newState.messages.
            
            return newState
        
        
        default: return state
    }
}

export const startDialog = (user) => { return { user, type: STARTDIALOG } }
export const onGetMessages = (messages) => { return { messages, type: GETMESSAGE } }  
export const onSendMessage = (message) => { return { message, type: SENDMESSAGE } }  
export const onDeleteMessageById = (id) => { return { id,  type: DELETEMESSAGE } }  
export const onGetDialogs = (dialogs) => { return { dialogs, type: GOTDIALOGS } }  
