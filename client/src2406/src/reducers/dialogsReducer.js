const STARTDIALOG = 'STARTDIALOG',  GETMESSAGE = 'GETMESSAGE',
SENDMESSAGE='SENDMESSAGE',DELETEMESSAGE='DELETEMESSAGE',GOTDIALOGS='GOTDIALOGS'

const defaultstate= {
    dialogs: [{
        _id: "6071eeed5cc3cf1754ad3fb6",
        profileImageSrc: "",
        publicName: "Vanich007",
        _doc: {
            dialogDate: "2021-04-10T18:31:09.082Z",
            lastMessage: "Привет, давно не виделись!!!",
            targetUser: "605b733f6fd9cf1bc86adb90",
            user: "605b733f6fd9cf1bc86adb90",
            _id: "6071eeed5cc3cf1754ad3fb6"
        }
    }],
    messages: [{date: "2021-04-07T19:03:26.297Z",
messageBody: "Message!!!111111111111",
messageImageSrc: "",
targetUser: "605b733f6fd9cf2bc86adb90",
user: "605b733f6fd9cf1bc86adb90",
__v: 0,
        _id: "606e01fe8ded942ae006c375"
    }, {date: "2021-04-07T19:04:08.903Z",
messageBody: "Message!!!1111111111111111",
messageImageSrc: "",
targetUser: "605b733f6fd9cf1bc86adb90",
user: "605b733f6fd9cf2bc86adb90",
__v: 0,
_id: "606e02288ded942ae006c376"},{date: "2021-04-10T18:31:08.811Z",
messageBody: "привет1111111111111111",
messageImageSrc: "",
targetUser: "605b733f6fd9cf1bc86adb90",
user: "605b733f6fd9cf1bc86adb90",
__v: 0,
_id: "6071eeec5cc3cf1754ad3fb5"}]
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
