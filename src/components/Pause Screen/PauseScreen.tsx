import {FC} from 'react'

interface IProps{
    resetGame:()=>void
}

const PauseScreen:FC<IProps> = ({resetGame})=>{
    return (
        <>
            <h1>JOGO PAUSADO</h1>
            <button onClick={()=>resetGame()}>Reiniciar</button>
        </>
    )
}

export default PauseScreen