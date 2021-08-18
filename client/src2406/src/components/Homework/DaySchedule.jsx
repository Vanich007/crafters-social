import s from './DaySchedule.module.css';
import React from 'react'
import OneHomework from './OneHomework';


class DaySchedule extends React.Component{
  render = () => {
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
    let subjectItem=''
    let lessonsUl = this.props.lessons.map((item,i) => {
      let subjectItem = this.props.subjects.find((s) => s.id == item).name
      
      let klassHomework = this.props.homework.filter((s) => s.subjectId == item);
      
     let klassHomeworkString=klassHomework.map((item)=>item.work)
   
      
      let addHomeworkToKlass=(work) =>this.props.addHomework(this.props.dayId, this.props.klassId,
        item, work)
      let clearHomeworkfromKlass=() =>this.props.clearHomework(this.props.dayId, this.props.klassId,
        item)
 
      return (<li key={i}>
        <OneHomework subjectItem={subjectItem} klassHomework={klassHomeworkString}
          addHomeworkToKlass={addHomeworkToKlass} clearHomeworkfromKlass={clearHomeworkfromKlass} />
        </li>)
    })


   
    return (
    <div className={s.tableitem}>
        <div className={s.tableitemheader}>{ days[this.props.dayId-1]}  </div>
              <div className={s.tableitembody}>
          <div className={s.lesson}>
          </div>
          
          <ul>{lessonsUl}</ul>
              </div>
          </div>
    )
  }
}


export default DaySchedule;