import React from 'react';
import Square,{SquareEnum} from './SquareFile.js';
import breitenSuche2 from './breitensuche.js';


export default class Board extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.state = {
      squares: Array(props.widthSquare*props.lengthSqaure).fill(null),
    };
  }

  

  mouseIsPlaced = false;
  cheeseIsPlaced = false;

  

//Algorithm
  breitenSuche = () => {
    let {squares} = this.state;
    let {widthSquare,lengthSqaure} = this.props;
    let hasMouse = false, hasCheese = false;


    squares.forEach(square => {
      if (square === SquareEnum.MAUS)
      hasMouse = true;
      else if(square === SquareEnum.KÄSE)
      hasCheese = true;
    });

if(hasMouse && hasCheese){
    let array = []; 
    for(let i = 0; i<lengthSqaure; i++){
      let i1 = i*widthSquare;
      let i2 = i1+widthSquare;

      array.push(squares.slice(i1,i2));


    }
    

   var rueckgabewertBreitenSuche2 = breitenSuche2(array);
 

   // rueckgabewertBreitenSuche2 verarbeiten
   rueckgabewertBreitenSuche2.forEach(coords => {
    squares[coords.y*widthSquare+coords.x] = SquareEnum.WEG;
   });
  }
  else{
alert('Mouse or cheese was not found')

  }
   this.setState({squares});

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
  handleClick(i, e) {
    //Copys the array and copys it into the local array 'squares'
    var squares = this.state.squares.slice();

  
if(e.button === 0 && e.ctrlKey && this.cheeseIsPlaced === false && squares[i] === SquareEnum.MAUS){
this.cheeseIsPlaced = true;
this.mouseIsPlaced = false;
squares[i] = SquareEnum.KÄSE;

}
else if(e.button === 2 && this.mouseIsPlaced === false && squares[i] === SquareEnum.KÄSE){
  this.cheeseIsPlaced = false;
  this.mouseIsPlaced = true;
  squares[i] = SquareEnum.MAUS;
  
  }
   else if (e.button === 0 && e.ctrlKey && this.cheeseIsPlaced === false) 
    {

      this.cheeseIsPlaced = true;
      squares[i] = SquareEnum.KÄSE;
    }
  else if(e.button === 0  && squares[i]=== SquareEnum.KÄSE){
      this.cheeseIsPlaced = false;
      squares[i] = SquareEnum.MAUER;
      
      }
      else if(e.button === 0  && squares[i]=== SquareEnum.MAUS){
        this.mouseIsPlaced = false;
        squares[i] = SquareEnum.MAUER;
        
        }
    else if (e.button === 0 && e.shiftKey)
     {
      if (squares[i] === SquareEnum.MAUS)
      {
        this.mouseIsPlaced = false;
      }

      if (squares[i] === SquareEnum.KÄSE) 
      {
        this.cheeseIsPlaced = false;
      }

      squares[i] = SquareEnum.NICHTS;
    }
     else if (e.button === 0) 
    {
      squares[i] = SquareEnum.MAUER;
    } 
    else if (e.button === 2 && this.mouseIsPlaced === false) {
      this.mouseIsPlaced = true;
      squares[i] = SquareEnum.MAUS;
    }

    e.preventDefault();

    this.setState({
      squares: squares
    });
  }

 //creates a square with the value mouse, wall, cheese or nothing.
  renderSquare(i) {
    return (
      <Square value={this.state.squares[i]} key={i} onClick={e => this.handleClick(i, e)} />
    );
  }

 // creates 1 row of stacked squares.
  renderRow(i){
   
    var arrayRow= [];
    for(let b = i ;b < i+this.props.widthSquare ; b++ ){
     arrayRow.push(this.renderSquare(b));
    }
   return(

    <div key={i} className='board-row'>
      {arrayRow}
    
    </div>
    
   )
  }

  // in this array will be the rows of stacked squares.
  renderLength()
  {
    
    var arrayLength = [];
    
   
    // the number which will be given to them is the number of the first square in the row.

    for(let i = 0; i<this.props.lengthSqaure;i++){

      arrayLength.push(this.renderRow(i*this.props.widthSquare));
    
    }
    
    return(      
      <div className='parentButton'>
      {arrayLength}
      </div>
    
    )


  }

  render() {
    
    return (
     <> {this.renderLength()}
<input type='button' onClick={this.breitenSuche}  value='Search'/>
</>
    )
   
  }
}