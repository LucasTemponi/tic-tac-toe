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
            ['', '', '']
        ],
        xIsNext:true,
        winner:'',
        status:'NEW_GAME',    
    })
    const [isOpen,setIsOpen] = React.useState<boolean>(true)

    const play = (column:number,row:number)=>{  
        if(!gameState.winner){
            if(!gameState.board[column][row]){
                let squareState:string[][] = gameState.board.slice();
                squareState[column][row]= gameState.xIsNext ? 'X':'O';
                setGameState({...gameState,xIsNext:!gameState.xIsNext,board:squareState,status:'PLAYING'});
            }
        }         
    }

    React.useEffect(()=>{
        const vencedor = checkWin()
        if(checkWin()){        
            announceWinner(vencedor);
            return;
        }
        if(!gameState.xIsNext && !gameState.winner ){
            setTimeout(()=>{superAI()},600);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[gameState.board])

    const checkWin = ()=>{
        const empate = (gameState.board[0].indexOf('')=== -1 && gameState.board[1].indexOf('')===-1 && gameState.board[2].indexOf('')===-1);
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
        if (empate){
            return "Empate"
        }
        return '';
    }

    const superAI = ()=>{
        let invalidMove = true;
        while(invalidMove){
            const nextMoveColumn:number = Math.floor(Math.random()*3);
            const nextMoveRow:number = Math.floor(Math.random()*3);
            if (gameState.board[nextMoveColumn][nextMoveRow] === ''){
                play(nextMoveColumn,nextMoveRow);
                invalidMove = false;
            }
        }        
    }

    const announceWinner = function (vencedor:string) {
        if (vencedor === "Empate"){
            setGameState({...gameState,winner:'EMPATE',status:'EMPATE'});
        } else{            
            let lastPlayer:string = gameState.xIsNext ? 'O':'X' ;
            setGameState({...gameState,winner:lastPlayer,status:`${lastPlayer}_WON`});
            console.log(`${lastPlayer} wins!`);
        }
        setIsOpen(true);
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
        });
    }

    return (
        <body>
            <Header setIsOpen={()=>setIsOpen(!isOpen)}/>
            {isOpen && <Modal newGame={restartGame} gameStatus={gameState.status} setIsOpen={()=>setIsOpen(!isOpen)}/>}
            <div className="ticTacToe">
                {gameState.board.map((column,index) => <Column clickFunc = {play} column={column} key={index} columnNumber={index}/> )}
            </div>            
            <div className='Header'>
                <h3>Pr??xima jogada: {gameState.xIsNext ? 'X':'O'}</h3>
            </div>
        </body>        
    )
}

export default Board                            