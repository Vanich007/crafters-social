import s from './Login.module.css';
import React from 'react'

function Login({selectKlass,klass,selectedKlass}) {
  let klassList = klass.map((item) => {
    
    if (item.id == selectedKlass) 
    return (
      <option selected key={item.id} value={item.id}>{item.klass}</option>
      )
    else return (
      <option  key={item.id} value={item.id}>{item.klass}</option>
      )
  })
  klassList=[<option key= '-1' value="-1" hidden="">Класс не выбран</option>,...klassList]
  let newUserKlassElement=React.createRef();
  let klassChanged = () => selectKlass(newUserKlassElement.current.value)
  return (
      <div className={s.header}>
      <div>Выберите класс:</div>
      <select name="klassSelect" onChange={klassChanged} ref={newUserKlassElement} >{klassList}</select>
    </div>
  );
}

export default Login;