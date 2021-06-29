import s from './ShowUsers.module.css';




function ShowUsers({name,id,delUser,klass}) {
  //  debugger
  // 

  return (

      <div className={s.user}>
       <img alt='avatar' src='/images/guestavatar.gif' className={s.avatar}></img>
      <span className={s.name}>{name}</span>
      <span className={s.klass}>{klass}</span>
        <button onClick={()=>delUser(id)}>Delete</button>
        </div>
    
  );
}

export default ShowUsers;