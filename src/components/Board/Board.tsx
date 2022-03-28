import './Board.css'
import Column from '../Column/Column'
import Modal from '../Modal/Modal'
import Header from '../Header/Header'
import React,{FC} from 'react'

interface ICheckers{
    board:string[][]
    xIsNext:boolean
    winner:string
    status:string
}

export const Board:FC = ()=>{
    
    const [gameState,setGameState] = React.useState<ICheckers>({
        board:[
            ['', '', ''],
            ['', '', ''],
            ['', '', '']],
        xIsNext:true,
        winner:'',
        status:'NEW_GAME'    
    })
    const [isOpen,setIsOpen] = React.useState<boolean>(true)

    const play = (column:number,row:number)=>{  
        if(!gameState.winner){
            if(!gameState.board[column][row]){
                let squareState:string[][] = gameState.board.slice()
                squareState[column][row]= gameState.xIsNext ? 'X':'O'
                setGameState({...gameState,xIsNext:!gameState.xIsNext,board:squareState,status:'PLAYING'})
            }
        }         
    }

    React.useEffect(()=>{
        if(checkWin()){         
            announceWinner()
            return
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gameState.board])

    const checkWin = ()=>{
        for (let i = 0; i < gameState.board.length; i++) {
            if (gameState.board[i][0] === gameState.board[i][1] && gameState.board[i][1] === gameState.board[i][2]&& gameState.board[i][1]!=='') {
                return gameState.board[i][0];
            }
        }
        for (let i = 0; i < gameState.board.length; i++) {
            if (gameState.board[0][i] === gameState.board[1][i] && gameState.board[1][i] === gameState.board[2][i] && gameState.board[1][i]!=='') {
                return gameState.board[0][i];
            }
        }
        if (gameState.board[0][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][2] && gameState.board[2][2] !== "") {
            return gameState.board[0][0];
        }
        if (gameState.board[0][2] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][0] && gameState.board[0][2] !== '') {
            return gameState.board[0][2];
        }
        return false;
    }

    const announceWinner = function () {
        let lastPlayer:string = gameState.xIsNext ? 'O':'X' 
        setGameState({...gameState,winner:lastPlayer,status:`${lastPlayer}_WON`});
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
            winner:'',
            status:'NEW_GAME'    
        })
    }

    return (
        <body>
            <Header setIsOpen={()=>setIsOpen(!isOpen)}/>
            {isOpen && <Modal newGame={restartGame} giveUp={announceWinner} gameStatus={gameState.status} setIsOpen={()=>setIsOpen(!isOpen)}/>}
            <div className="ticTacToe">
                {gameState.board.map((column,index) => <Column clickFunc = {play} column={column} key={index} columnNumber={index}/> )}
            </div>            
            <div className='Header'>
                <h3>Próxima jogada: {gameState.xIsNext ? 'X':'O'}</h3>

            </div>
        </body>        
    )
}

export default Board                            