const STARTDIALOG = 'STARTDIALOG',  GETMESSAGE = 'GETMESSAGE',
SENDMESSAGE='SENDMESSAGE',DELETEMESSAGE='DELETEMESSAGE',GOTDIALOGS='GOTDIALOGS'
type DialogsReducerInitialStateType = {
    dialogs: Array<DialogsType>,
    messages:Array<MessagesType>
}
type DialogsType = {
        _id: string,
        profileImageSrc: string,
        publicName: string,
        _doc: {
            dialogDate: string,
            lastMessage: string,
            targetUser: string,
            user: string,
            _id: string
        }
    }    

type MessagesType={date: string,
messageBody: string,
messageImageSrc: string,
targetUser: string,
user: string,
__v: number,
        _id: ""
    }
const defaultstate:DialogsReducerInitialStateType= {
    dialogs:  [{
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

type StartDialogActionType= {
    type: typeof STARTDIALOG,
        user:Object
}
type OnGetMessagesActionType = {
    type: typeof GETMESSAGE,
    messages:Array<MessagesType>
}
type OnSendMessageActionType = {
    type: typeof SENDMESSAGE,
    message:MessagesType
}
type OnDeleteMessageById = {
    type: typeof DELETEMESSAGE,
    id:string
}
type OnGetDialogsActionType = {
    type: typeof GOTDIALOGS,
    dialogs:Array<DialogsType>
}
export const startDialog = (user) :StartDialogActionType=> { return { user, type: STARTDIALOG } }
export const onGetMessages = (messages):OnGetMessagesActionType => { return { messages, type: GETMESSAGE } }  
export const onSendMessage = (message):OnSendMessageActionType => { return { message, type: SENDMESSAGE } }  
export const onDeleteMessageById = (id):OnDeleteMessageById => { return { id,  type: DELETEMESSAGE } }  
export const onGetDialogs = (dialogs) :OnGetDialogsActionType=> { return { dialogs, type: GOTDIALOGS } }  
