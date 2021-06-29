
import Homework from './Homework';
import { addHomework, clearHomework} from '../../reducers/homeworkReducer'


import { connect } from 'react-redux'



  const mapStateToProps = (state) => {
    return {
      schedule: state.homeworkPage.schedule,
      subjects: state.homeworkPage.subjects,
      homework: state.homeworkPage.homework,
      klass:state.usersPage.klass,
      selectedKlass:state.usersPage.selectedKlass,
     
    }
  }
        
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //     // newUser: () => dispatch(addUserCreateAction()),
  //     // typeNewUser: (name) => dispatch(typeUsernameCreateAction(name)),
  //     // delUser: (id1) => dispatch(deleteUserCreateAction(id1)),
  //     // selectKlass: (id2) => dispatch(selectKlassCreateAction(id2)),
  //     // onSelectedUser: (id) => dispatch(selectUserCreateAction(id))
  //   }
 // }
  
const HomeworkContainer = connect(mapStateToProps, {addHomework,clearHomework})(Homework);




export default HomeworkContainer;