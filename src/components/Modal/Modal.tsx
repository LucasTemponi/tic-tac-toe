import React from 'react'
import './Modal.css'
import {FC} from 'react'
import NewGame from '../New Game Screen/NewGame'
import WinScreen from '../Win Screen/WinScreen'

interface IModal{
    setIsOpen:(openState:boolean)=>void
    gameStatus:string
    newGame:()=>void
}

const Modal:FC<IModal> = ({setIsOpen,gameStatus,newGame})=>{
    return(
    <div className='modal' onClick={()=>setIsOpen(false)}>
        <div className='modal-content'>
            {
                {
                    'NEW_GAME':<NewGame/>,
                    'X_WON':<WinScreen newGame={newGame} winner='X'/>,
                    'O_WON':<WinScreen newGame={newGame} winner='O'/>,
                    'PLAYING':<h1>GAME PAUSED</h1>
                }[gameStatus]
            }            
        </div>        
    </div>)
}

export default Modal;