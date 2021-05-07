import s from './Homework.module.css';
//import React from 'react'
//import { render } from '@testing-library/react';
import DaySchedule from './DaySchedule'

function Homework (props){
  
        let klassSchedule,klassSchedule1=[]
    
    if (props.selectedKlass >= 0)
      for (let today = 1; today <= 7; today++) {
        
        klassSchedule = props.schedule.filter(
          (u) => ((u.klassId == props.selectedKlass)&&(u.day == today) )//
        )
       let klassHomework =  props.homework.filter(
         (u) => ((u.klassId == props.selectedKlass) &&
           (u.day == today) )//
        )
        
        klassSchedule1.push(klassSchedule.map((item) => {

          return (
            <li key={item.id}>
              <DaySchedule clearHomework={ props.clearHomework} addHomework={props.addHomework} klassId={props.selectedKlass} key={item.id} homework={ klassHomework} dayId={today} lessons={item.lessons} subjects={props.subjects}  />
            </li>
          );
        }))
      }  //today


    return (
      <div className={s.header}>
        <div className={s.table}>
          <ul>
         { klassSchedule1}
      </ul>
    </div>
    
      
    </div >
  );}   



export default Homework;