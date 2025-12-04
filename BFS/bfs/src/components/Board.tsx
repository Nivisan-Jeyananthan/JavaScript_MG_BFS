import React, { useState } from 'react';
import Square,{SquareEnum} from './Square';
import breadthFirstSearch from './BreadthFirstSearch';
import type { SquareEnumType } from './Square';


interface IBoardProps{
    boardWidth: number,
    boardLength: number
}

export default function Board(props:IBoardProps)
{
  const [squares,setSquares] = useState<Array<SquareEnumType>>(Array(props.boardWidth* props.boardLength).fill(null));
  const [hasMouse, setHasMouse] = useState<boolean>(false);
  const [hasCheese, setHasCheese] = useState<boolean>(false);

  

//Algorithm
 const checkGameObjects = () => {
    const {boardWidth,boardLength} = props;


    squares.forEach(square => {
      if (square === SquareEnum.MAUS)
      setHasMouse(true);
      else if(square === SquareEnum.KÄSE)
      setHasCheese(true);
    });

    // make array of pixel positions ????
  if(hasMouse && hasCheese){
    let array:SquareEnumType[][] = []; 
    for(let i = 0; i < boardLength; i++){
      let i1 = i*boardWidth;
      let i2 = i1+boardWidth;

      array.push(squares.slice(i1,i2));
    }
    


   // set all fields to a possible path
   const copySquare = [...squares];
   breadthFirstSearch({array}).forEach(coords => {
    copySquare[coords.y*boardWidth+coords.x] = SquareEnum.WEG;
   });
     setSquares(copySquare);
  }
  else{
alert('Mouse or cheese was not found')

  }
 

  }
  
/**
 * 
 * these if's are about the input of the mouse. 
 * mouse 0 = leftclick
 * mouse 1 = middleclick
 * mouse 2 = rightclick
 * 
 *  */  
// Says if the square (button) should be later a mouse, wall, cheese or path.
 const handleClick =(i:number, e:React.MouseEvent<HTMLDivElement>):void =>  {
    //Copys the array and copys it into the local array 'squares'
    let localSquares = squares.slice();

  
if(e.button === 0 && e.ctrlKey && !hasCheese  && localSquares[i] === SquareEnum.MAUS){
setHasCheese(true);
setHasMouse(true);
localSquares[i] = SquareEnum.KÄSE;

}
else if(e.button === 2 && hasMouse === false && localSquares[i] === SquareEnum.KÄSE){
  setHasCheese(false);
  setHasMouse(true);
  localSquares[i] = SquareEnum.MAUS;
  
  }
   else if (e.button === 0 && e.ctrlKey && hasCheese === false) 
    {

      setHasCheese(true);
      localSquares[i] = SquareEnum.KÄSE;
    }
  else if(e.button === 0  && localSquares[i]=== SquareEnum.KÄSE){
        setHasCheese(false);
      localSquares[i] = SquareEnum.MAUER;
      
      }
      else if(e.button === 0  && localSquares[i]=== SquareEnum.MAUS){
        setHasMouse(false);
        localSquares[i] = SquareEnum.MAUER;
        
        }
    else if (e.button === 0 && e.shiftKey)
     {
      if (localSquares[i] === SquareEnum.MAUS)
      {
       setHasMouse(false);
      }

      if (localSquares[i] === SquareEnum.KÄSE) 
      {
      setHasCheese(false);
      }

      localSquares[i] = SquareEnum.NICHTS;
    }
     else if (e.button === 0) 
    {
      localSquares[i] = SquareEnum.MAUER;
    } 
    else if (e.button === 2 && hasMouse === false) {
      setHasMouse(true);
      localSquares[i] = SquareEnum.MAUS;
    }

    e.preventDefault();

    setSquares(localSquares);
  }

 //creates a square with the value mouse, wall, cheese or nothing.
const renderSquare = (i: number) => {
    return (
      <Square value={squares[i]} key={i} onClick={e => handleClick(i, e)} />
    );
  }

 // creates 1 row of stacked squares.
const renderRow = (i: number) => {
   
    var arrayRow= [];
    for(let b = i ;b < i+props.boardWidth ; b++ ){
     arrayRow.push(renderSquare(b));
    }
   return(

    <div key={i} className='board-row'>
      {arrayRow}
    
    </div>
    
   )
  }

  // in array will be the rows of stacked squares.
const renderLength = () => 
  {
    
    var arrayLength = [];
    
   
    // the number which will be given to them is the number of the first square in the row.

    for(let i = 0; i<props.boardLength;i++){

      arrayLength.push(renderRow(i*props.boardWidth));
    
    }
    
    return(      
      <div className='parentButton'>
      {arrayLength}
      </div>
    
    )


  }

   return (
     <> {renderLength()}
  <input type='button' onClick={checkGameObjects}  value='Search'/>
</>
    )
   
  }