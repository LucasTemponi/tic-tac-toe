import './WinScreen.css';
import {FC} from 'react';
import winnerImage from './winner.png';

interface IProps{
    winner:string
    newGame:()=>void
}

const WinScreen:FC<IProps> = ({winner,newGame}) => {
    if (winner === 'Todos'){
        return (
            <div className="win-screen">
               <img src={winnerImage} alt={`${winner} won`}/>
                <h1>Todos são vencedores!</h1>
                <button onClick={()=>{
                    newGame()
                }}>
                    Novo Jogo
                </button>
            </div>
        )
    }else{
        return (
            <div className="win-screen">
            <img src={winnerImage} alt={`${winner} won`}/>
                <h1>Vitória do {winner}!</h1>
                <button onClick={()=>{
                    newGame()
                }}>
                    Novo Jogo
                </button>
            </div>
        )
    }
}

export default WinScreen
