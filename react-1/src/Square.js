export default function Spuare({value, onSquareClick}) {
    return (
      <div>
        <button className="squares" onclick = {onSquareClick}>
          {value}
        </button>
      </div>
    )
  }