import './Column.css'
import Square from '../Square/Squares'
import {FC} from 'react'

interface IColumn{
    column:string[]
    columnNumber:number
    clickFunc:(column:number,square:number)=>void;
}

export const Column: FC<IColumn> = ({column,clickFunc,columnNumber})=> (
    <div className="column">
        {column.map((square,index) => <Square handle={clickFunc} column={columnNumber} row={index} key={index}>{square}</Square>)}
    </div>
)
export default Column