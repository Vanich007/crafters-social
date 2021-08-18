//import { FormControl } from 'redux-form'
import s from './formControls.module.css';



export const Textarea = (props) => {
    const { input, meta, child, ...restProps } = props
    return  < FormControl { ...props }><textarea {...input} {...restProps} /></FormControl >
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props
   
    return  < FormControl { ...props }><input {...input} {...restProps} /></FormControl >
}
const FormControl = ({ input, meta, child, ...props }) => {
    const hasError=meta.touched&&meta.error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : "")}>
            <div>
                {props.children}
            </div>    
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
