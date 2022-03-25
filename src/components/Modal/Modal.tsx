import React from 'react'
import './Modal.css'
import {FC} from 'react'

interface IModal{
    setIsOpen:(openState:boolean)=>void
    gameStatus:string
}

const Modal:FC<IModal> = ({setIsOpen,gameStatus})=>{
    return(
    <div className='modal' onClick={()=>setIsOpen(false)}>
        <div className='modal-content'>
            {
                {
                    'NEW_GAME':<h1>Hello World</h1>,
                    'X_WON':<h1>X venceu!</h1>,
                    'O_WON':<h1>O venceu!</h1>,
                    'PLAYING':<h1>GAME PAUSED</h1>
                }[gameStatus]
            }            
        </div>        
    </div>)
}

export default Modal;