import s from './OneHomework.module.css';
import React from 'react'


class OneHomework extends React.Component{
 
  // constructor(props) {
  //   super(props)
  // //this.props.delUser=this.props.delUser.bind(this)
 
  // }
   
  render = () => {
    const addHomeworkHere = () => {
      const s=prompt('Ввод ДЗ', 'Нет домашнего задания')
      this.props.addHomeworkToKlass(s)
    }
    const homework=this.props.klassHomework.reduce((summ, item) => summ = summ + '; ' + item, ' ')
    return (

      <div key={this.props.id}>
        
        {this.props.subjectItem}
      
      :
        <span className={s.homework}>{homework}</span>
      
        <button onClick={() => addHomeworkHere()}>Добавить ДЗ</button>
        <button onClick={()=>this.props.clearHomeworkfromKlass()}>Очистить ДЗ</button>
        </div>
    
  );
    
  }
}


export default OneHomework;