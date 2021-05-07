import React from 'react'
import "./modal.css"
const Modal = ({ active, setActive, setFalseAfter, children }) => {
    
    return (//setActive(false);
        <div className={active ? "modal active" : "modal"} onClick={() => {  setFalseAfter(false) }}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={(e) => { e.stopPropagation() }}>
                {children}
            </div>
        </div>
    )
}
export default Modal