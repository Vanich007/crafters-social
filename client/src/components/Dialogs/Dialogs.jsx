import {PureComponent, useEffect} from 'react'
import { connect } from 'react-redux'
import {getDialogsByUserId} from '../../utils/API/connectDialogs'
import {onGetDialogs} from '../../reducers/dialogsReducer'
import { Link } from 'react-router-dom'
import s from './Dialogs.module.css'

class Dialogs extends PureComponent {
    componentDidMount() {
        if (this.props.currentUser._id) { this.props.getDialogsByUserId() }

        document.title = 'Диалоги пользователя' + ` на ${process.env.REACT_APP_SITE_TITLE}`
}
componentDidUpdate(prevProps) {
    if (this.props.currentUser._id)
    if(this.props.currentUser._id!==prevProps.currentUser._id){
        this.props.getDialogsByUserId()
    }}
    render(){
       
        
    let dialogs = this.props.dialogs.map(item => {
        let date=item._doc.dialogDate.substr(0, 10)
        return (
            <li key={item._id}><DialogItem targetUserId={item._doc.targetUser}
            profileImageSrc={item.profileImageSrc} 
            targetUser={item.publicName} message={item._doc.lastMessage} date={date}/></li>
        )
    })

    return (<div className={s.usersList}>
        <ul>
        {dialogs}
        </ul>
    </div>)
}}

const DialogItem = (props) => {
  
    const profileImageSrc=props.profileImageSrc
    
    return <Link to={'/dialogs/'+props.targetUserId}>
         <div className={s.dialogitem}>
        <div className={s.avatarplace}>       
        <img src={ (profileImageSrc?`${window.location.protocol}//${window.location.hostname}/${profileImageSrc}`:`${window.location.protocol}//${window.location.hostname}/images/guestavatar.gif`)} className={s.avatar}></img>
      </div> 
            <div className={s.messagearea}>
                <div className={s.namemessage}>
                <span className={s.username}>{props.targetUser}</span>
                <span className={s.message}>{props.message}</span>
                </div>
                <span className={s.date}>{props.date}</span>
        </div>
    </div></Link>
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.signupPage.currentUser,
      dialogs: state.dialogsPage.dialogs
    }
  }
        
 
const DialogsContainer = connect(mapStateToProps,
     {getDialogsByUserId})(Dialogs);//getMessageByMessageId

export default DialogsContainer;