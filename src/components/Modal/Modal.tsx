import React from 'react'
import './Modal.css'
import {FC} from 'react'
import NewGame from '../New Game Screen/NewGame'
import WinScreen from '../Win Screen/WinScreen'
import PauseScreen from "../Pause Screen/PauseScreen"

interface IModal{
    setIsOpen:(openState:boolean)=>void
    gameStatus:string
    newGame:()=>void
    giveUp:()=>void
}

const Modal:FC<IModal> = ({setIsOpen,gameStatus,newGame,giveUp})=>{
    return(
    <div className='modal' onClick={()=>setIsOpen(false)}>
        <div className='modal-content'>
            {
                {
                    'NEW_GAME':<NewGame/>,
                    'X_WON':<WinScreen newGame={newGame} winner='X'/>,
                    'O_WON':<WinScreen newGame={newGame} winner='O'/>,
                    'PLAYING':<PauseScreen giveUp={giveUp} resetGame={newGame}/>
                }[gameStatus]
            }            
        </div>        
    </div>)
}

export default Modal;