import './Board.css'
import Column from '../Column/Column'
import Modal from '../Modal/Modal'
import React,{FC} from 'react'

interface ICheckers{
    board:string[][]
    xIsNext:boolean
    winner:string
}

export const Board:FC = ()=>{
    
    const [gameState,setGameState] = React.useState<ICheckers>({
        board:[
            ['', '', ''],
            ['', '', ''],
            ['', '', '']],
        xIsNext:true,
        winner:''    
    })
    const [isOpen,setIsOpen] = React.useState<boolean>(true)

    const play = (column:number,row:number)=>{  
        if(!gameState.winner){
            if(!gameState.board[column][row]){
                let squareState:string[][] = gameState.board.slice()
                squareState[column][row]= gameState.xIsNext ? 'X':'O'
                setGameState({...gameState,xIsNext:!gameState.xIsNext,board:squareState})
            }
        }         
    }

    React.useEffect(()=>{
        if(checkWin()){
            announceWinner()
            return
        }
    },[gameState.board])

    const checkWin = ()=>{
        for (let i = 0; i < gameState.board.length; i++) {
            if (gameState.board[i][0] === gameState.board[i][1] && gameState.board[i][1] === gameState.board[i][2]) {
                return gameState.board[i][0];
            }
        }
        for (let i = 0; i < gameState.board.length; i++) {
            if (gameState.board[0][i] === gameState.board[1][i] && gameState.board[1][i] === gameState.board[2][i]) {
                return gameState.board[0][i];
            }
        }
        if (gameState.board[0][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][2]) {
            return true;
        }
        if (gameState.board[0][2] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][0]) {
            return true;
        }
        return false;        
    }

    const announceWinner = function () {
        let lastPlayer:string = gameState.xIsNext ? 'O':'X' 
        setGameState({...gameState,winner:lastPlayer})
        setIsOpen(true)
        console.log(`${lastPlayer} wins!`)
    }

    const restartGame = ()=>{
        setGameState({
            board:[
                ['', '', ''],
                ['', '', ''],
                ['', '', '']],
            xIsNext:true,
            winner:''    
        })
    }

    return (
        <body>
            {isOpen && <Modal setIsOpen={setIsOpen}/>}
            <div className="ticTacToe">
                {gameState.board.map((column,index) => <Column clickFunc = {play} column={column} key={index} columnNumber={index}/> )}
            </div>
            <div className='Header'>
                <h1>Next player: {gameState.xIsNext ? 'X':'O'}</h1>
                <button onClick={()=>announceWinner()}>Desistir</button>
                <button onClick={()=>restartGame()}>Recomeçar</button>
                <button onClick={()=>setIsOpen(!isOpen)}>Fecha modal</button>
            </div>
        </body>        
    )
}

export default Board                            