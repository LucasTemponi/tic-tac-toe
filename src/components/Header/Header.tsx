import {FC} from 'react'
import './Header.css'

interface IProps{
    setIsOpen:()=>void
}

const Header:FC<IProps> =({setIsOpen}) => {
    return(
        <div className="header">
            <h1>Jogo da Velha</h1>
            <img src='https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/settings-512.png' alt='Opções' onClick={()=>setIsOpen()}/>
        </div>
    )
}

export default Header;
