import {useState}from 'react';
import Board from './Board';


export function Game() {
    const [boardWidth, setBoardWidth] = useState(5);
    const [boardLength,setBoardLength] = useState(5);


    const handleClick = () => {

    }
 
    return (
      <>
      <div>
          Width :
          <input value={boardWidth} onChange={e => setBoardWidth(Number.parseInt(e.target.value))} type={"number"}/>
          <br />
          Length :

                   <input value={boardLength} onChange={e => setBoardLength(Number.parseInt(e.target.value))} type={"number"}/>

          <input type="button" onClick={handleClick} value="Submit" />
        </div>

        <div className="game">
          <div className="game-board">
            <Board key={boardWidth+':'+boardLength} boardWidth={boardWidth} boardLength={boardLength} />
          </div>
        </div>
      </>
    );
  }