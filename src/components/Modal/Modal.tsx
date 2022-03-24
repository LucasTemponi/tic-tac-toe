import React from 'react'
import './Modal.css'
import {FC} from 'react'

interface props{
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
}

const Modal:FC<props> = (setIsOpen)=>{
    return(
    <div className='modal'>
        <div className='modal-content'>
            <h1>Hello World</h1>
        </div>
        
    </div>)
}

export default Modal;