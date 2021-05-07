const ADDHOMEWORK='ADDHOMEWORK', CLEARHOMEWORK='CLEARHOMEWORK'

const defaultstate= {
        schedule:
        [{ id:1,klassId: 1, day: 1, lessons: [1, 2, 3, 4, 5] },
            { id:2,klassId: 2, day: 1, lessons: [5, 4, 2, 3, 1] },
            { id: 3, klassId: 1, day: 2, lessons: [4, 5, 3, 1, 2] },
            { id: 4, klassId: 2, day: 2, lessons: [2, 4, 1, 5, 3] },
            { id: 5, klassId: 1, day: 3, lessons: [5, 2, 1, 4, 3] },
            { id: 6, klassId: 2, day: 3, lessons: [3, 5, 2, 4, 2] },
             { id:1,klassId: 1, day: 4, lessons: [1, 2, 3, 4, 5] },
            { id:2,klassId: 2, day: 4, lessons: [5, 4, 2, 3, 1] },
            { id: 3, klassId: 1, day: 5, lessons: [4, 5, 3, 1, 2] },
            { id: 4, klassId: 2, day: 5, lessons: [2, 4, 1, 5, 3] }
           ],
    subjects: [{ id: 1, name:'Математика'},
                { id: 2, name:'Русский язык'},
                { id: 3, name: 'Литература' },
                { id: 4, name: 'Физическая культура' },
                { id: 5, name:'Естествознание'}
    ],
    homework: [{ id:1,klass_id: 1, day: 1, subjectId: 1, work: 'Задачи 1,2,3' },
        { id:2,klassId: 1, day: 1, subjectId: 1, work: 'Задачи 1,2,3' },
        { id:3,klassId: 1, day: 2, subjectId: 2, work: 'Упражнение 12 письменно' },
        { id:4,klassId: 2, day: 1, subjectId: 3, work: 'Читать Буратино' },
        { id:5,klassId: 2, day: 2, subjectId: 2, work: 'Упражнение 14 письменно' },
        { id: 6, klassId: 2, day: 3, subjectId: 3, work: 'Устно разобрать героев повести Щелкунчик' }],
    maxHomeworkId:6
            

    // selectedKlass: -1
        
    }
  
const homeworkReducer=(state = defaultstate, action)=>{
    let newState = { ...state };
    switch (action.type)
    {

        case ADDHOMEWORK:
            const newHomework = {
                id: ++newState.maxHomeworkId, klassId: action.klassId, day: action.day,
                subjectId: action.subjectId, work: action.work
            }
            
            newState.homework=[...state.homework,newHomework]
            return newState
         case CLEARHOMEWORK:
           
            
            newState.homework = state.homework.filter((item) => !((item.day == action.day) &&
                (item.klassId == action.klassId) && (item.subjectId == action.subjectId)))
            return newState
        default: return state
    }
}

export const addHomework = (day, klassId, subjectId, work) => { return { day, klassId, subjectId, work, type: ADDHOMEWORK } }
export const clearHomework = (day, klassId, subjectId) => { return { day, klassId, subjectId,  type: CLEARHOMEWORK } }    


export default homeworkReducer