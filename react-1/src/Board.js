import { useState } from "react";
import Spuare from "./Square"

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    function handleClick() {
        const nextSquares = squares.slice();
        nextSquares[0] = "x";
        setSquares(nextSquares);
    }
    return (
      <>
      <div className='board-row'>
        <Spuare value = {squares[0]} onSquareClick={handleClick}/>
        <Spuare value = {squares[1]} onSquareClick={handleClick}/>
        <Spuare value = {squares[2]} onSquareClick={handleClick}/>
      </div>
      <div className='board-row'>
        <Spuare value = {squares[3]} onSquareClick={handleClick}/>
        <Spuare value = {squares[4]} onSquareClick={handleClick}/>
        <Spuare value = {squares[5]} onSquareClick={handleClick}/>
      </div>
      <div className='board-row'>
        <Spuare value = {squares[6]} onSquareClick={handleClick}/>
        <Spuare value = {squares[7]} onSquareClick={handleClick}/>
        <Spuare value = {squares[8]} onSquareClick={handleClick}/>
      </div>
      </>
    )
  }