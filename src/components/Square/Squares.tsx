import './Square.css'
import {FC} from 'react'

interface ISquare{
    handle:(column:number,square:number)=>void
    column:number
    row:number
}

export const Square: FC<ISquare> = ({children,handle,column,row})=>{

   return <span className='square' onClick={()=>handle(column,row)}>{children}</span>
}

export default Square